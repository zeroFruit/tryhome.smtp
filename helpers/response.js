const responseByCode = (res, code, status = 200) => {
  return res.status(status).json({ code });
}

const responseByCodeWithData = (res, code, status = 200, data = null) => {
  return res.status(status).json({ code, data });
}

module.exports = {
  responseByCodeWithData,
  responseByCode
}
