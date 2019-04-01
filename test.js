/**
 *1. 使用 Array.includes 来处理多重条件 
 *举个栗子：
 * 
 * */
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
// 限制 ：如果我们想要匹配更多的红色水果呢，
// 比方说『樱桃』和『蔓越莓』？我们是不是得用更多的 || 来扩展这条语句？
// 我们可以使用 Array.includes(Array.includes) 重写以上条件句。
function test(fruit) {
  // 把条件提取到数组中
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}



/**
 * 2. 少写嵌套，尽早返回
 * 
 *  让我们为之前的例子添加两个条件：
 *  如果没有提供水果，抛出错误。
 *  如果该水果的数量大于 10，将其打印出来
 *
 *  */

function test(fruit, quanity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // 条件一：fruit 必须有值
  if (fruit) {
    // 条件二 必须为红色
    if (redFruits.includes(fruit)) {
      console.log('red');
      // 条件三 必须大量存在
      if (quanity > 10) {
        console.log('big quantity')
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}
test(null) // 报错

/**
 * 优化1
 * /_ 当发现无效条件时尽早返回 _/
 */
function test(fruit, quanity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // 条件一： 尽早抛出 错误
  if (!fruit) throw new Error('No fruit!');

  // 条件二： 必须为红色
  if (redFruits.includes(fruit)) {
    console.log('red');
    // 条件三： 必须是大量
    if (quanity > 10) {
      console.log('big quantity');
    }
  }
}
/**
 * 优化2
 * /_ 当发现无效条件时尽早返回 _/
 */
function test(fruit, quanity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (!fruit) throw new Error('No fruit!');
  if (!redFruits.includes(fruit)) return;
  console.log('red');
  // 条件三
  if (quanity > 10) {
    console.log('big quantity');
  }
}

/**
 * 3. 使用函数默认参数和解构
 */
function test(fruit, quanity) {
  if (!fruit) return;
  const q = quanity || 1;
  console.log(`We have ${q} ${fruit}!`);
}
/**
 * 优化
 * 通过函数的默认参数来去掉变量 q。
 */
function test(fruit, quanity = 1) {
  if (!fruit) return;
  console.log(`We have ${quanity} ${fruit}!`);
}

function test({
  name
} = {}, quanity = 1) {
  console.log(name || 'unknown')
}
test(undefined) //unknown
test({}) //unkonwn
test({
  name: 'apple',
  color: 'red'
})




/**
 * 4.0 相较于 switch，Map / Object 也许是更好的选择
 * 我们想要根据颜色打印出各种水果：
 */
function test(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}
//测试结果
test(null); // []
test('yellow'); // ['banana', 'pineapple']

/**
 * 优化1
 * 
 */
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
}

function test(color) {
  return fruitColor[color] || []
}

/**
 * 重构语法
 * 使用 Array.filte
 */
const fruits = [{
    name: 'apple',
    color: 'red'
  },
  {
    name: 'strawberry',
    color: 'red'
  },
  {
    name: 'banana',
    color: 'yellow'
  },
  {
    name: 'pineapple',
    color: 'yellow'
  },
  {
    name: 'grape',
    color: 'purple'
  },
  {
    name: 'plum',
    color: 'purple'
  }
];

function test(color) {
  return fruits.filter(f => f.color == color);
}

/**
 * 5. 使用 Array.every 和 Array.some 来处理全部/部分满足条件
 * 我们想要检查是否所有的水果都是红色的：
 */
const fruits = [{
    name: 'apple',
    color: 'red'
  },
  {
    name: 'banana',
    color: 'yellow'
  },
  {
    name: 'grape',
    color: 'purple'
  }
];

function test() {
  let isAllRed = true;
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }
  console.log(isAllRed);
}

/**
 * 优化1
 */
function test() {
  const isAllRed = fruits.every(f => f.color == 'red');
  console.log(isAllRed);
}

/**
 * 检查是否有至少一个水果是红色的
 * 
 */
function test() {
  const isAllRed = fruits.some(f => f.color == 'red');
  console.log(isAllRed);
}

/**
 * 6 数组去重
 * 一、利用ES6 Set去重
 * (不能去掉 {} 空对象)
 */
function unique(arr) {
  return Array.from(new Set(arr))
}
var arr = [1, 5, 5, 6, 8, 9, 7, 5]
console.log(unique(arr));


/**
 * 二、利用for嵌套for，然后splice去重
 * 双层循环，外层循环元素，内层循环时比较值
 */
function unique(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] == array[j]) {
        array.splice(j, 1);
        j--
      }
    }
  }
  return array;
}

/**
 * 三、利用indexOf去重
 * {} 和 NaN 不能去重
 */
var arr = [];

function unique(array) {
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) === -1) {
      arr.push(array[i])
    }
  }
}

/**
 * 四、利用sort()
 * 先排序，在比较
 */
var array = [];

function unique(arr) {
  arr = arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      o
      array.push(arr[i]);
    }
  }
}

/**
 * 五、利用对象的属性不能相同的特点进行去重
 * NaN和{}去重
 */
function unique(arr) {
  var array = [];
  var obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      array.push(arr[i]);
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++
    }
  }
  return array;
}

/**
 * 六、利用includes
 * {}没有去重
 */
function unique(arr) {
  var array = [];
  for (let i = 0; i < array.length; i++) {
    if (!array.includes(arr[i])) {
      array.push(arr[i]);
    }
  }
  return array;
}

/**
 * 八、利用filter
 */
function unique(arr) {
  return arr.filter(function (item, idnex, arr) {
    return arr.indexOf(item, 0) === idnex;
  })
}
/**
 * 十二、[...new Set(arr)]
 * 
 */
[...new Set(arr)]



/**
 * 输出 10个10
 */
var funcs = [];
for (var i = 0; i < array.length; i++) {
  funcs.push(function(){console.log(i)})
}
funcs.forEach(function(func){
  func();
})

/**
 * 输出0-9
 */
const funcs = [];
for (let i = 0; i < 10; i++) {
  funcs.push(function(){
    console.log(i)
  })
}
funcs.forEach(func => func());
