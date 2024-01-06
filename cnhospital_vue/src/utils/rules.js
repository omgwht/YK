// export function checkIdNum(rule, value, callback) {
//     const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
//     if (!value) {
//       return callback(new Error('证件号码不能为空'))
//     } else if (!reg.test(value)) {
//       return callback(new Error('证件号码不正确'))
//     } else {
//       callback()
//     }
//   }

//   export default {
//     checkId: [{ required: true, validator: checkIdNum, trigger: 'blur' }],
//   }