function returnResponseTrueMissionfuinction(message="") {
  return {mission:true,message}
}

function returnResponseFalseMissionfuinction(message="") {
  return {mission:false,message}
}

function returnResponseDataMissionfuinction(data) {
  return {mission:true,data}
}

export {
  returnResponseTrueMissionfuinction,
  returnResponseDataMissionfuinction,
  returnResponseFalseMissionfuinction
}
