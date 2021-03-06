const mongoose = require('mongoose')
const Question = mongoose.model('QuestionnaireList')
const URL = require('url');
class Questionnaire {
  static async getbrand(ctx) {
    const params = ctx.request.body;
    if (!params.id) {
      ctx.body = {
        data: ['无数据']
      }
      return;
    }
    const result = await Question.findOne({
      id: params.id
    })
    const data = await result.brand;
    ctx.body = {
      data
    }
  }
  static async getproblem(ctx) {
    //返回操作
    const result = await Question.find({})
    const data = []
    result.forEach(item => {
      if (item.show == 1) {
        data.push({
          id: item.id,
          wjName: item.wjName,
          examWjid: item.examWjid,
          wjCode: item.wjCode
        })
      }
    })
    ctx.body = {
      data
    }
  }
  static async getwts(ctx) {
    const params = ctx.request.body;
    if (!params.id) {
      ctx.body = {
        data: {
          status: {
            code: 203,
            message: "无法获取到id"
          }
        }
      }
      return;
    }
    const result = await Question.findOne({
      id: params.id
    })
    const data = result.questionnaire;
    ctx.body = {
      data
    }
  }
  static async removeqution(ctx) { //删除问卷
    const params = ctx.request.body;
    if (!params.id) {
      ctx.body = {
        data: {
          status: {
            code: 203,
            message: "无法获取到id"
          }
        }
      }
      return;
    }
    const conditions = {
      id: params.id
    }
    const update = {
      show: 0
    }
    const options = {
      new: true
    }
    const result = await Question.findOneAndUpdate(conditions, update, options)
    if (result.show == 0) {
      ctx.body = {
        data: {
          status: {
            code: 200,
            message: "OK"
          }
        }
      }
    } else {
      ctx.body = {
        data: {
          status: {
            code: 203,
            message: "删除错误"
          }
        }
      }
    }
  }
  static async addqution(ctx) {

  }
}

module.exports = Questionnaire;