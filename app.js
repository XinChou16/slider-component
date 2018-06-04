
// Component
class Slider {
	constructor(el) {
  	this.container = document.getElementById(el);// slide容器
    this.slides =  this.container.querySelectorAll('.slide');// 所有slide item
    this.prevBtn = document.getElementById('prev');
    this.nextBtn = document.getElementById('next');
    this.cursors = document.querySelectorAll('.cursor')
    this.offset = 1;// 偏移量，即个数
    this.slideIndex = 1;// slide index one of 0, 1, 2
    this.pageIndex = 1;// page index of total pictures
    this.pageNum = 5;// total pictures
  }
  bindEvents() {
    // foreward and backward
  	this.nextBtn.addEventListener( 'click',() => {
    	this.go(1)
    })
  	this.prevBtn.addEventListener( 'click', () => {
    	this.go(-1)
    })

    // control cursor
    
    this.cursors.forEach(function(cursor,index) {
      cursor.addEventListener('click',function() {
        mySlider.nav(index)
      })
    })
  }
  
  // nav to index
  nav(index) {
    this.pageIndex = index;
    this.calcDistance();
  }

  // 标准化index，使index始终为0,1,2中的一个
  normalIdx(index,len) {
    return (index + len) % len;
  }
  
  // slide move according to the flag
  go(flag) {
    // 1. offset and slideIndex change
    this.offset += flag;
    this.pageIndex += flag;
    const slideIndex = this.slideIndex = this.normalIdx( this.slideIndex += flag,3);
     
     // 计算移动距离
     this.calcDistance();
  }
  
  // style change
  calcDistance() {
  	const offset = this.offset;
    const slideIndex = this.slideIndex;

    // 1. relevant index
    const prevIndex = this.normalIdx( slideIndex - 1, 3)
    const nextIndex = this.normalIdx( slideIndex + 1, 3)
    this.pageIndex = this.normalIdx(this.pageIndex,this.pageNum) 

    // 2. container and slide move
    this.container.style.transform = `translateX(${-100 * (offset)}%) `;
    this.slides[prevIndex].style.left = `${100 * (offset - 1)}%`;
    this.slides[slideIndex].style.left = `${100 * offset}%`;
    this.slides[nextIndex].style.left = `${100 * (offset + 1)}%`;

    // 3. cursor style
    // const cursors = Array.from(this.cursors);
    const cursors = this.cursors;
    cursors.forEach(function(cursor,index) {
     let cursorClass = cursor.classList;
     if(cursorClass.contains('active')) {
       cursorClass.remove('active')
     }
    })
    cursors[this.pageIndex].classList.add('active')

    //console.log(this.pageIndex,this.slideIndex)
    this.renderImg(this.pageIndex,this.slideIndex);
  }
  renderImg(pageIndex,slideIndex) {
  	for(let i = -1; i <= 1; i++) {
      let index = (slideIndex+i+3) % 3; // 决定图片的url和left漂移
      let img = this.slides[index].querySelector('img');
      let picId = this.normalIdx( pageIndex + i, this.pageNum) + 1;
      
      // 页面初始化使用，运行一次
      if(!img) {
        img = document.createElement('img');
        this.slides[index].appendChild(img);
      }
      img.src = 'http://placehold.it/300x200&text=' + picId + '-Mint';
    }
  }
  start() {
  	this.bindEvents();
    this.nav(2);
  }
}

// custom
const mySlider = new Slider('m-slider');
mySlider.start()