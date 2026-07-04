/* ========================================
   味来餐厅 - 交互脚本
   这部分让网站有交互功能：
   - 菜品分类筛选
   - 预约表单提交
   - 导航栏滚动效果
   ======================================== */

// ---------- 1. 菜品分类筛选 ----------
// 点击分类标签，显示/隐藏对应的菜品
document.addEventListener('DOMContentLoaded', function() {
  // 等页面加载完再执行（重要！不然元素可能还没出来）

  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      // 1. 切换标签的激活状态
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      // 2. 获取选中的分类
      const category = this.getAttribute('data-category');

      // 3. 显示/隐藏菜品
      items.forEach(function(item) {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          // 加一点动画效果：先透明再显示
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(function() {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ---------- 2. 预约表单提交 ----------
  const form = document.getElementById('reserveForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // preventDefault() 阻止表单默认提交（不然页面会刷新）

    // 获取表单数据
    const formData = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      guests: document.getElementById('guests').value,
      message: document.getElementById('message').value
    };

    // 简单验证：检查必填项
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      alert('请填写所有必填项（带 * 的字段）');
      return;
    }

    // 手机号简单验证
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      alert('请输入正确的手机号码');
      return;
    }

    // 模拟提交（真实项目中这里要发到后端服务器）
    console.log('预约信息：', formData);

    // 显示成功提示
    successMsg.classList.add('show');
    form.reset();

    // 3秒后自动隐藏提示
    setTimeout(function() {
      successMsg.classList.remove('show');
    }, 5000);

    // 滚动到成功提示
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // ---------- 3. 导航栏滚动效果 ----------
  // 往下滚动后，导航栏加阴影，视觉上更分明
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
  });

  // ---------- 4. 设置预约日期的最小值为今天 ----------
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  // toISOString() 把日期转成 YYYY-MM-DD 格式
  dateInput.setAttribute('min', today);
  // 防止用户选择过去的日期

  // ---------- 5. 控制台欢迎信息 ----------
  console.log('🍽️  味来餐厅网站已就绪！');
  console.log('👋  你好！这个网站是用 HTML + CSS + JS 纯手写的。');
  console.log('💡  打开 index.html 查看完整代码，每一行都有注释。');
  console.log('🚀  下一步：把图片替换成真实照片，改掉联系信息，就可以卖给客户了！');
});
