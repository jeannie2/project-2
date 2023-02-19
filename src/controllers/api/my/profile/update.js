import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import uploadFileAsync from '../../../_helpers/upload-file.js'

const updateSchema = yup.object({
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    test: async (value, { email: originalEmail }) => {
      if (value === originalEmail) return true
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  }),
  password: yup.string().test(
    'empty-or-6-characters-check',
    'password must be at least 6 characters',
    (password) => !password || password.length >= 6
  ),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  avatar: yup.mixed()
})

const controllersApiMyProfileUpdate = async (req, res) => {
  try {
    const { body, session: { user: { id, email } } } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true, context: { email } })
    await uploadFileAsync(verifiedData, req)

    const currentUser = await prisma.user.findUnique({ where: { id } })
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: verifiedData.email,
        avatar: verifiedData.avatar || currentUser.avatar || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        ...verifiedData.password && { passwordHash: await bcrypt.hash(verifiedData.password, 10) }
      }
    })

    return res.status(201).json(_.omit(updatedUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileUpdate
