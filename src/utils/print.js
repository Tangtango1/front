// 打印类属性、方法定义
/* eslint-disable */
class Print {
  constructor(dom, options) {
    this.options = {
      noPrint: '.no-print',
      ...options
    };

    if (typeof dom === 'string') {
      this.dom = document.querySelector(dom);
    } else {
      this.dom = this.isDOM(dom) ? dom : dom.$el;
    }

    if (!this.dom) {
      throw new Error('打印元素未找到');
    }

    this.init();
  }

  init() {
    const content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  }

  getStyle() {
    let str = '';
    const styles = document.querySelectorAll('style, link');
    
    styles.forEach(style => {
      str += style.outerHTML;
    });

    str += `<style>
      ${this.options.noPrint || '.no-print'} { display: none !important; }
      @page { size: auto; margin: 0; }
    </style>`;

    return str;
  }

  getHtml() {
    // 处理表单元素状态
    this.preserveFormData();
    
    // 包裹打印元素并返回HTML
    return this.wrapperRefDom(this.dom).outerHTML;
  }

  preserveFormData() {
    // 处理input元素
    document.querySelectorAll('input').forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked ? input.setAttribute('checked', 'checked') 
                     : input.removeAttribute('checked');
      } else {
        input.setAttribute('value', input.value);
      }
    });

    // 处理textarea元素
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.innerHTML = textarea.value;
    });

    // 处理select元素
    document.querySelectorAll('select').forEach(select => {
      Array.from(select.children).forEach(option => {
        option.selected ? option.setAttribute('selected', 'selected')
                       : option.removeAttribute('selected');
      });
    });
  }

  wrapperRefDom(refDom) {
    let wrappedDom = refDom.cloneNode(true);
    let currentDom = refDom.parentElement;

    while (currentDom && currentDom !== document.body) {
      const parentClone = currentDom.cloneNode(false);
      parentClone.appendChild(wrappedDom);
      wrappedDom = parentClone;
      currentDom = currentDom.parentElement;
    }

    return wrappedDom;
  }

  writeIframe(content) {
    const iframe = document.createElement('iframe');
    iframe.id = 'print-iframe';
    iframe.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      top: -10px;
      left: -10px;
      visibility: hidden;
    `;

    document.body.appendChild(iframe);

    const iframeWindow = iframe.contentWindow || iframe.contentDocument?.defaultView;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) {
      throw new Error('无法创建打印iframe');
    }

    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();

    iframe.onload = () => {
      this.toPrint(iframeWindow);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  }

  toPrint(frameWindow) {
    try {
      setTimeout(() => {
        frameWindow?.focus();
        try {
          if (!frameWindow?.document.execCommand('print', false, null)) {
            frameWindow?.print();
          }
        } catch (e) {
          frameWindow?.print();
        }
        frameWindow?.close();
      }, 10);
    } catch (err) {
      console.error('打印出错:', err);
    }
  }

  isDOM(obj) {
    return obj instanceof HTMLElement;
  }
}

export default {
  install(app) {
    app.config.globalProperties.$print = (dom, options) => {
      return new Print(dom, options);
    };
    
    // 提供组合式API支持
    app.provide('$print', Print);
  }
};