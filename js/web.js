(function () {
	let winScroll;

	const navigation = document.querySelector('.navigation')

	console.log(navigation)

	const scrollButtons = document.querySelectorAll('.scrollto');
    for (let elm of scrollButtons) {
        elm.onclick = e => {
            e.preventDefault()
            const href = elm.getAttribute('href');
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    window.onscroll = () => {

        winScroll = window.scrollY

        // Reveal effects
        document.querySelectorAll('.reveal').forEach(el => {
            isInViewport(el) ? el.classList.add('visible') : el.classList.remove('visible')
        })

        // Navbar morph
        winScroll > 100 ?
            navigation.classList.add('sticky') :
            navigation.classList.remove('sticky')
  }
})()