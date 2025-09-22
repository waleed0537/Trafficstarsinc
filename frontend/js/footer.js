document.querySelectorAll('#deviceTabsD button').forEach(button => {
    button.addEventListener('click', function() {
        var device = this.dataset.bsTarget.replace('#', '');

        document.querySelectorAll('.tab-pane.active .device-content').forEach(content => {
            content.classList.remove('active');
        });

        document.querySelectorAll('.tab-pane.active .device-content.' + device).forEach(content => {
            content.classList.add('active');
            content.querySelector('video').currentTime = 0;
            content.querySelector('video').play();
        });

        document.querySelectorAll('.tab-pane:not(.active) video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    });
});

document.querySelectorAll('#adFormatTabs button').forEach(button => {
    button.addEventListener('click', function() {
        var format = this.dataset.bsTarget.replace('#', '');
        document.querySelectorAll('.tab-pane').forEach(tab => {
            tab.classList.remove('show', 'active');
        });
        document.getElementById(format).classList.add('show', 'active');
        var activeDeviceTab = document.querySelector('#deviceTabsD .nav-link.active');
        if (activeDeviceTab) {
            activeDeviceTab.click();
        }
    });
});

document.querySelectorAll('#deviceTabs button').forEach(button => {
    button.addEventListener('click', function() {
        var device = this.dataset.bsTarget.replace('#', '');
        document.querySelectorAll('.carousel-item.active .device-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.carousel-item.active .device-content.' + device).forEach(content => {
            content.classList.add('active');
            content.querySelector('video').currentTime = 0;
            content.querySelector('video').play();
        });
        document.querySelectorAll('.carousel-item:not(.active) video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    });
});

function isDesktopSafari() {
    const userAgent = navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isNotMobile = !/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
    const isWideScreen = window.innerWidth > 1200;
    return isSafari && isNotMobile && isWideScreen;
}

if (isDesktopSafari()) {
    document.querySelectorAll('video').forEach(video => {
        // Попытка взять URL видео из атрибута src
        let videoUrl = video.src || video.getAttribute('data-src') || video.querySelector('source') ? .src;

        if (videoUrl) {
            fetch(videoUrl)
                .then(response => response.blob())
                .then(blob => {
                    let url = URL.createObjectURL(blob);
                    video.src = url;
                    video.setAttribute('preload', 'auto');
                    video.load();
                })
                .catch(error => console.error('Error loading video:', error));
        } else {
            console.warn('No video URL found for element:', video);
        }
    });
}

let currentScene = null;
let mobile = false;

function createGlobeScene(containerId) {
    var container = document.getElementById(containerId);

    // Создание сцены
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Создание сферы
    var geometry = new THREE.SphereGeometry(1, 256, 256);
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('/frontend/images/home/earth2.jpg', () => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(1, 1);

        if (!mobile) {
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.magFilter = THREE.LinearFilter;

            var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.anisotropy = maxAnisotropy;
        }
    });
    if (mobile) {
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            specular: 0x000000
        });
    } else {
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            specular: 0x000000
        });
    }
    var globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    var pointLight = new THREE.PointLight(0xffffff, 2);

    pointLight.position.set(-26, 50, 25);
    scene.add(pointLight);

    if (!mobile) {
        var ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
    }

    globe.rotation.x = Math.PI / 2.5;

    if (mobile) {
        globe.rotation.x = Math.PI / 3.1;
        globe.rotation.x = Math.PI / 2.9;
    }

    globe.rotation.z = Math.PI / 9.5;
    globe.rotation.y = -0.75;

    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        material.map.offset.x -= 0.0005;
        renderer.render(scene, camera);
    }

    function updateCameraAndGlobeSize() {
        var width = container.clientWidth;
        var height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        var fovRad = (camera.fov * Math.PI) / 180;
        var sphereHeight = 2;
        var modX = 5;
        if (mobile) {
            sphereHeight = 1.8
            modX = 4.5;
        }
        var distance = sphereHeight / (modX * Math.tan(fovRad / modX));

        var modY = 0.3;
        if (mobile) {
            modY = 0.45;
        }
        camera.position.set(0, modY, distance);
        renderer.setSize(width, height);
    }

    setTimeout(updateCameraAndGlobeSize, 200);
    window.addEventListener('resize', updateCameraAndGlobeSize);

    animate();

    return {
        scene,
        renderer,
        container,
        camera,
        globe
    };
}

function switchScene() {
    var screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
        mobile = false;
        // Большой экран
        if (currentScene && currentScene.container.id === 'globe-container-mob') {
            currentScene.renderer.dispose();
            currentScene.container.innerHTML = '';
        }
        if (!currentScene || currentScene.container.id !== 'globe-container') {
            currentScene = createGlobeScene('globe-container');
        }
    } else {
        mobile = true;
        // Мобильный экран
        if (currentScene && currentScene.container.id === 'globe-container') {
            currentScene.renderer.dispose();
            currentScene.container.innerHTML = '';
        }
        if (!currentScene || currentScene.container.id !== 'globe-container-mob') {
            currentScene = createGlobeScene('globe-container-mob');
        }
    }
}

// Инициализация сцены при загрузке страницы
//window.addEventListener('load', switchScene);

// Переключение сцены при изменении размера окна
//window.addEventListener('resize', switchScene);

document.addEventListener('DOMContentLoaded', () => {

    const globeContainers = [
        document.getElementById('globe-container'),
        document.getElementById('globe-container-mob')
    ].filter(Boolean);

    if (globeContainers.length === 0) {
        return;
    }

    const threshold = 150;

    function getOffsetTop(element) {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }

    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function checkElementPosition() {
        const scrollPosition = window.scrollY + window.innerHeight;

        globeContainers.forEach(container => {
            if (getOffsetTop(container) > 0 && scrollPosition >= getOffsetTop(container) - threshold) {
                loadScript("/frontend/js/three.min.js", createAndObserveScene);
                window.removeEventListener('scroll', checkElementPosition);
            }
        });
    }

    function createAndObserveScene() {
        switchScene();
        window.addEventListener('resize', switchScene);
    }

    window.addEventListener('scroll', checkElementPosition);
    checkElementPosition();
});