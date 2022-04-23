// Night Mode ---------------------------------------------->
nightMode.addEventListener('click', () => {
    const cards = document.querySelectorAll('.cards');
    const modal = document.querySelector('.modal');
    const headings = document.querySelectorAll('h2');
    const pS = document.querySelectorAll('p');
    
    const dark = '#262627';
    const darker = '#1b1b1b';
    const lighter = '#e4e4e4';
    const light = '#9e9e9e';

    if (nightMode.checked) {
        //set BG colour
        setBGColor(header, darker);
        setBGColor(body, dark);
        setBGColor(modal, darker);
        setBGColor(searchBar, darker);

        //set colour
        setColor(searchBar, lighter);
        setColor(label, light);

        //search bar
        searchBar.style.border = 'none';

        cards.forEach(card => {
            setBGColor(card, darker);
            card.style.border = 'none';
        });

        headings.forEach(heading => {
            setColor(heading, lighter);
            heading.style.fontWeight = 500;
        });

        pS.forEach(p => setColor(p, light));
        spans.forEach(span => setColor(span, lighter));

        //change icon fills
        modalClose.style.fill = light;
        socialIcons.forEach(icon => icon.style.fill = light);
        
    } else {
        //reset BG colour
        setBGColor(header, '');
        setBGColor(body, '');
        setBGColor(modal, '');
        setBGColor(searchBar, '');

        //reser colour
        setColor(searchBar, '');
        setColor(label, '');

        //reset search bar
        searchBar.style.border = '';

        cards.forEach(card => {
            setBGColor(card,'');
            card.style.border = '';
        });

        headings.forEach(heading => {
            setColor(heading, '');
            heading.style.fontWeight = '';
        });

        pS.forEach(p => setColor(p, ''));
        spans.forEach(span => setColor(span, ''));
        
        //set icon fills
        modalClose.style.fill = '';
        socialIcons.forEach(icon => icon.style.fill = '');
    }
    
});