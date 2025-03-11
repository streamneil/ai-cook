document.addEventListener('DOMContentLoaded', () => {
  // 获取DOM元素
  const searchInput = document.getElementById('ingredient-search');
  const searchBtn = document.getElementById('search-btn');
  const recipesContainer = document.getElementById('recipes-container');
  
  // 初始加载推荐菜谱
  fetchRecipes();
  
  // 搜索按钮点击事件
  searchBtn.addEventListener('click', () => {
    const ingredients = searchInput.value.trim();
    if (ingredients) {
      // 这里将来会根据食材搜索菜谱
      // 现在先简单地重新获取所有菜谱
      fetchRecipes(ingredients);
    }
  });
  
  // 回车键搜索
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
  
  // 获取菜谱数据
  async function fetchRecipes(ingredients = '') {
    try {
      // 这里将来会传递食材参数
      const response = await fetch('/api/recipes');
      const recipes = await response.json();
      
      displayRecipes(recipes);
    } catch (error) {
      console.error('获取菜谱失败:', error);
      recipesContainer.innerHTML = '<p class="error-message">获取菜谱失败，请稍后再试。</p>';
    }
  }
  
  // 显示菜谱
  function displayRecipes(recipes) {
    if (recipes.length === 0) {
      recipesContainer.innerHTML = '<p class="no-results">没有找到匹配的菜谱，请尝试其他食材。</p>';
      return;
    }
    
    recipesContainer.innerHTML = '';
    
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      
      // 随机生成一个颜色作为背景（实际项目中会使用真实图片）
      const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
      
      recipeCard.innerHTML = `
        <div class="recipe-image" style="background-color: ${randomColor}"></div>
        <div class="recipe-content">
          <h3 class="recipe-title">${recipe.name}</h3>
          <div class="recipe-info">
            <span>烹饪时间: ${recipe.cookingTime} 分钟</span>
            <span>难度: ${recipe.difficulty}</span>
          </div>
          <div class="recipe-ingredients">
            <h4>主要食材:</h4>
            <ul>
              ${recipe.ingredients.slice(0, 5).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
          </div>
          <a href="#" class="recipe-button" data-id="${recipe.id}">查看详情</a>
        </div>
      `;
      
      // 添加查看详情点击事件
      const detailBtn = recipeCard.querySelector('.recipe-button');
      detailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showRecipeDetails(recipe);
      });
      
      recipesContainer.appendChild(recipeCard);
    });
  }
  
  // 显示菜谱详情（模拟弹窗，实际项目中可能会跳转到详情页）
  function showRecipeDetails(recipe) {
    alert(`
      ${recipe.name}
      
      烹饪时间: ${recipe.cookingTime} 分钟
      难度: ${recipe.difficulty}
      
      食材:
      ${recipe.ingredients.join(', ')}
      
      步骤:
      ${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}
    `);
  }
});