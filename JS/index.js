document.addEventListener("DOMContentLoaded", function() {
    const containers = [
        document.querySelector('.container_1'),
        document.querySelector('.container_2'),
        document.querySelector('.container_3')
    ];

    const menuItems = document.querySelectorAll('.menu li');

    function showContainer(containerIndex) {
        containers.forEach((container, index) => {
            container.style.display = index === containerIndex ? 'flex' : 'none';
        });
    }

    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener('click', () => {
            showContainer(index);
        });
    });

    document.addEventListener('scroll', reveal);

    function reveal() {
        var reveals = document.querySelectorAll('.show');

        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 100;

            if (revealtop < windowheight - revealpoint) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    const mln = document.querySelectorAll('.menu-list-name');
    const img = document.querySelectorAll('img');
    const mli = document.querySelectorAll('.menu-list-id');
    const moviegenre = document.querySelectorAll('.menu-list');

    moviegenre.forEach((show, i) => {
        show.addEventListener('mouseenter', () => {
            const boundingRect = img[i].getBoundingClientRect();

            if (boundingRect) {
                img[i].style.transition = "transform 0.8s ease"; // Adiciona uma transição suave
                img[i].style.transform = `translateX(1190px)`;

                // Define o sublinhado do gênero e do ID
                if (mln[i].style.textDecoration === 'none') {
                    mli[i].style.textDecoration = 'underline';
                    mln[i].style.textDecoration = 'underline';
                }
            }
        });

        //QUANDO TIRA O MOUSE DE CIMA DO GENRE
        show.addEventListener('mouseleave', () => {
            img[i].style.transition = "transform 0.4s ease"; // Adiciona uma transição suave para a opacidade
            img[i].style.transform = "translateX(-0px)"; // Retorna a imagem para a posição original
            if (mln[i].style.textDecoration = 'none') {
                mli[i].style.textDecoration = 'none';
            }
            if (mli[i].style.textDecoration = 'none') {
                mln[i].style.textDecoration = 'none';
            }
        });
    });
});
