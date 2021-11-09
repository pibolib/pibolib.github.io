var target = '18%';
window.onload = function() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        target = '100%';
        var root = document.querySelector(':root');
        root.style.setProperty('--sidebar-width', '0%');
    }
    var a = document.getElementById('sidebarbutton');
    a.onclick = function() {
        var root = document.querySelector(':root');
        var rootstyle = getComputedStyle(root);
        var rootsidebar = rootstyle.getPropertyValue('--sidebar-width');
        if(rootsidebar != '0%')
        {
            root.style.setProperty('--sidebar-width', '0%');
        }
        else
        {
            root.style.setProperty('--sidebar-width', target);
        }
    }
}

