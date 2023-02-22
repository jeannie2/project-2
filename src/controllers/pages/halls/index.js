const controllersPagesHallsIndex = async (req, res) => {
  const { params: { hallId } } = req
  res.render(`halls/${hallId}`)
}

export default controllersPagesHallsIndex
