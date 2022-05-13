function resetActiveLinks() {
    let currentActiveMenu = document.querySelector('#menu-options-wrapper li.active');
    if(currentActiveMenu !== null){
        currentActiveMenu.classList.remove('active');
    }
}

function setActiveLink(menu) {
    resetActiveLinks();
    menu.classList.add('active');
}

function setActiveLinkOnLoad() {
    resetActiveLinks();

    let links = document.querySelectorAll('#menu-options-wrapper li');
    links.forEach( link => {
        if(window.location.href.includes(link.id)) {
            link.classList.add('active');
        }
    } )
    
}

function renderMenuComponent(menu) {
    return `<li id=${menu} >
                <a href="#${menu}" onclick="setActiveLink(${menu})">
                    <p>
                        ${menu}
                        <span></span>
                    </p>
                </a>
            </li>`
}

function mouseEnterHandler( event ) {
    let direction = determineDirection(this, event);                                                          //get direction where mouseenter
    hoverFXByDirection(this, direction, 'in');
}

function mouseLeaveHandler( event ) {
    let direction = determineDirection(this, event);                                                          //get direction where mouseleave
    hoverFXByDirection(this, direction, 'out');
}

function hoverFXByDirection(_this, direction, inorout) {
    let element = _this.firstElementChild.firstElementChild;                                                          //get background for hoverstyle
    let parent = _this.parentNode.parentNode;                                                                         //get parent <ul>
    let childrenLength = parent.children.length - 1;                                                                  //get children length
    let thisIndex = Array.prototype.indexOf.call(parent.children, _this.parentNode);                                  //get this element child index

    if(direction === 1 && thisIndex < childrenLength) element.style.animation = `slide${inorout}right .15s forwards`; //no slideinright effect if last child
    else if (direction === 3 && thisIndex > 0) element.style.animation = `slide${inorout}left .15s forwards`;         //no slideinleft effect if first child
    else element.style.animation = `fade${inorout} .15s forwards`;                                                    //default hover effects
}

//https://stackoverflow.com/questions/16650859/how-to-detect-mouseenter-direction-on-a-specific-element
function determineDirection(element, event){
    const pos = {x: event.pageX, y: event.pageY}
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    const x = (pos.x - element.offsetLeft - (w/2)) * (w > h ? (h/w) : 1);
    const y = (pos.y - element.offsetTop  - (h/2)) * (h > w ? (w/h) : 1);
    return Math.round((((Math.atan2(y,x) * (180/Math.PI)) + 180)) / 90 + 3) % 4;
}

window.addEventListener('DOMContentLoaded', () => {

    //render menu navbar
    const options = ["overview", "integrations", "activity", "domains", "usage", "settings"];
    const menuOptionsWrapper = document.querySelector('#menu-options-wrapper');
    const newOptions = options.map( option => renderMenuComponent(option) )
    menuOptionsWrapper.innerHTML = newOptions.join('')

    // set active link on load
    setActiveLinkOnLoad();

    // mouse functions
    let links = document.querySelectorAll('#menu-options-wrapper li');
    links.forEach( link => link.firstElementChild.addEventListener('mouseenter', mouseEnterHandler) ) //add mouse event in <a>
    links.forEach( link => link.firstElementChild.addEventListener('mouseleave', mouseLeaveHandler) ) //add mouse event in <a>
});