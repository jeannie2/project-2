import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'
import uploadFileAsync from '../../_helpers/upload-file.js'

const signupSchema = yup.object({
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  }),
  password: yup.string().min(6).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  name: yup.string().required(),
  avatar: yup.mixed().required(),
  bio: yup.string().min(6).required(),
  link: yup.string().url().required()
})

const controllersApiAuthSignup = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await signupSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const newUser = await prisma.user.create({
      data: {
        email: verifiedData.email,
        avatar: verifiedData.avatar || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        passwordHash: await bcrypt.hash(verifiedData.password, 10),
        name: verifiedData.name,
        bio: verifiedData.bio,
        link: verifiedData.link
      }
    })

    req.session.user = { id: newUser.id, email: newUser.email }
    await req.session.save()

    return res.status(201).json(_.omit(newUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiAuthSignup
