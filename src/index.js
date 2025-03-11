const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// 路由
app.get('/api/recipes', (req, res) => {
  // 这里将来会从数据库获取菜谱
  const sampleRecipes = [
    {
      id: 1,
      name: '番茄炒蛋',
      ingredients: ['番茄', '鸡蛋', '葱', '盐', '糖'],
      steps: [
        '番茄切块，鸡蛋打散',
        '锅中放油，倒入鸡蛋炒熟盛出',
        '锅中再放油，放入番茄翻炒',
        '加入适量盐和糖调味',
        '倒入炒好的鸡蛋翻炒均匀即可'
      ],
      cookingTime: 15,
      difficulty: '简单'
    },
    {
      id: 2,
      name: '宫保鸡丁',
      ingredients: ['鸡胸肉', '花生', '干辣椒', '葱', '姜', '蒜', '酱油', '醋', '糖'],
      steps: [
        '鸡胸肉切丁，用盐、料酒、淀粉腌制',
        '花生米炒熟备用',
        '锅中放油，放入干辣椒、葱姜蒜爆香',
        '倒入鸡丁翻炒至变色',
        '加入酱油、醋、糖调味',
        '最后加入花生米翻炒均匀即可'
      ],
      cookingTime: 30,
      difficulty: '中等'
    }
  ];
  
  res.json(sampleRecipes);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});