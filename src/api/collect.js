/*
 * @Author: Dy 
 * @Date: 2022-02-27 17:40:47 
 * @Last Modified by: Dy
 * @Last Modified time: 2022-03-10 09:33:16
 */

import request from '@/utils/request'

export const deleteCoAddress = (data) => { //删除采样点
  return request({
    url: `/company/delete?id=${data.id}`,
    method: 'post',
  })
}

export const getCollectAddress = (data) => {//获取采样点列表
  return request({
    url: '/company/findAll',
    method: 'post',
    data: data
  })
}

export const searchColAddress = (data) => {
  return request({
    url: `/company/findAll?name=${data.name}`,
    method: 'post',
  })
}

export const saveExamPeople = (data) => {
  return request({
    url: '/exam/save',
    method: 'post',
    data: data
  })
}

export const saveColAddress = (data) => { 
  return request({
    url: `/company/save`,
    method: 'post',
    data: data
  })
}

export const scanCode = (data) => { //扫描条形码数字
  return request({
    url: `/exam/scanCode`,
    method: 'post',
    data: data
  })
}

export const getWxInfo = (data) => { //获取微信sdk数据
  return request({
    url: `/jsapi/getSign?tokenUrl=${data.tokenUrl}`,
    method: 'get',
  })
}

export const scanUserCode = (data) => { //扫描获取用户信息
  return request({
    url: `/exam/scanRecord?userCode=${data.userCode}`,
    method: 'post',
  })
}

export const getStaticData = (data) => { //获取统计数据
  return request({
    url: `/exam/summaryInfo`,
    method: 'post',
    data: data
  })
}

export const addPatientInfo = (data) => { //增加患者医护信息
  return request({
    url: `/record/saveDetail`,
    method: 'post',
    data: data
  })
}

export const getPatientInfo = (data) => { //获取患者医护信息
  return request({
    url: `/record/findDetail?id=${data.id}`,
    method: 'post',
  })
}

export const getPatientCode = (data) => { //获取患者code条形码
  return request({
    url: `/record/base64?id=${data.id}`,
    method: 'get',
  })
}


export const updatePatientCode = (data) => { //编辑患者信息
  return request({
    url: `/record/update`,
    method: 'post',
    data: data
  })
}