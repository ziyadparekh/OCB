'use strict';

var baseUrl = 'http://localhost:3010';

var topnav = {
    navMenu : [
        {
            title: 'Explore',
            link: baseUrl + '/explore'
        },
        {
            title: 'About',
            link: baseUrl + '/about'
        },
        {
            title: 'How To',
            link: baseUrl + '/how-to'
        }
    ]
};

module.exports = {
    topnav : topnav
};
