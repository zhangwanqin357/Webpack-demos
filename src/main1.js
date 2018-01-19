require('./main.css')

document.write('<h1>单入口文件</h1>')

// 处理图片及其他文件 file-loader,img-loader
var img2 = document.createElement('img')
img2.src = require('./logo.a7995ad.svg')
document.body.appendChild(img2)

var img1 = document.createElement('img')
img1.src = require('./frontend.fa388ca.png')
document.body.appendChild(img1)

//  UglifyJs Plugin 压缩文件
var longVariableName = 'UglifyJs Plugin'
longVariableName += '压缩文件'
document.write('<h1>' + longVariableName + '</h1>')

/*
代码分割
使用场景:在大型的项目中，并不建议将所有的代码放在一个文件里
比如有些代码块只在特定的场景下需要，那么这些代码块就可以单独分割出来，按需加载
此例子，最终main1.js会被打包成main.bundle.js,a.js会被打包成0.bundle.js
*/
require.ensure(['./components/a.js'], function(require) {
  var content = require('./components/a.js') //如果没有重新require，a.js只是可被使用，但是并没有输出
  document.open()
  document.write('<h1>' + content + '</h1>')
  document.close()
})
