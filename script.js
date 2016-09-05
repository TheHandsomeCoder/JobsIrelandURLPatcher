function getCookieByName(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function updateURLifOnJobPage() {
    const url = window.location.href;
    if(url.includes('/#/job-page') && !url.includes('?id=')) {
        var id = getCookieByName('JobId');
        var a = document.createElement('a');
        a.href = url;
        a.hash = "/job-page?id=" + id;
        history.replaceState({}, document.title, a.href);
    }
    else if(url.includes('/#/job-page?id=')) {

        var jobIDFromURL = url.split('=')[1];
        if(getCookieByName("JobId") !== jobIDFromURL) {
            //add the job id to the cookie so it can be picked up by the site on refresh
            createCookie('JobId', jobIDFromURL);
            location.reload(); //Reload so the new cookie will be picked up
        }
    }
}

updateURLifOnJobPage(); //run on first load
window.addEventListener("hashchange", updateURLifOnJobPage, false);

