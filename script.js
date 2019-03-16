var selectedItem = null;

var data = [
    {
        key: 1,
        name:"reddit",
        icon:"res/reddit.png",
        color: "#383544",
        links:[
            link("/r/all", "http://www.reddit.com/r/all"),
            link("/r/csharp", "http://www.reddit.com/r/csharp"),
        ]
    },
    {
        key: 2,
        name:"Youtube",
        icon:"res/youtube.png",
        color: "#98474D",
        links:[
            link("Vsauce", "https://www.youtube.com/user/Vsauce"),
        ]
    },
    {
        key: 3,
        name:"Misc",
        color: "#6C7C82",
        links:[
            link("IMDB", "https://imdb.com/"),
        ]
    },
    {
        key: 4,
        name:"Programming",
        icon:"res/programming.png",
        color: "#D65E4E",
        links:[
            link("The Rust Book", "https://doc.rust-lang.org/book/second-edition"),
            link("StackOverflow", "https://www.stackoverflow.com"),
            link("Game Programming", "http://www.gameprogrammingpatterns.com")
        ]
    },
];

function link(name, ref){
    return {
        name,
        ref
    };
}

function buildItem(i) {

    var links = i.links.map((x, i) => `
    <span class="item">
    <a href="${x.ref}">${x.name}</a> [${i + 1}]
    </span>
    `).join("");

    var icon = i.icon ? 
        `<img src="${i.icon}"></img>` :
        ``;

    $("body").append(`
    <div class="stripe" style="background-color:${i.color}">
        <div class="title"><span>[${i.key}] ${i.name}</span></div>
        <div class="content">
            <div>${icon}</div>
            ${links}
        </div>
    </div>
    `);
}


$(document).ready(function() {

    selectedItem = null;
    
    for (var item of data){
        console.log("buildItem", item)
        buildItem(item);
    }
    
    $('a').attr("tabIndex", -1);

    //Search Bar

    var $search = $("input[name='q']");

    $("span[name='yt']").click(function() {
        var curr = $search.val();
        $search.val("!yt " + curr);
        $search.focus();
    });

    $("span[name='sr']").click(function() {
        var curr = $search.val();
        $search.val("!sr " + curr);
        $search.focus();
    });

    $("span[name='a']").click(function() {
        var curr = $search.val();
        $search.val("!a " + curr);
        $search.focus();
    });

    $("span[name='w']").click(function() {
        var curr = $search.val();
        $search.val("!w " + curr);
        $search.focus();
    });

    //Tabs

    $(this).find(".content").stop().attr({
        opacity: 0
    });


    $(document).keyup(function(e, f) {
        console.log("keypress", e.which);

        var child = e.which - 48;
        var isEsc = e.which == 27;

        if (isEsc) {
            selectedItem = null;

            var el = $(`.stripe`);

            el.removeClass("open");
            
            el.stop().animate({
                width: '40px'
            });
            el.find(".content").stop().animate({
                opacity: 0
            });

            $("input").blur();

            return;
        }

        if (!selectedItem && !data.find(x => x.key == child)) {
            return;
        }

        if (!selectedItem) {
            var el = $(`.stripe:nth-of-type(${child})`);

            if (el.hasClass("open")) {

                closeMenuItem(el);

            } else {
                selectedItem = child;

                openMenuItem(el);
            }
        } else {
            var el = $(`.stripe:nth-of-type(${selectedItem})`);

            var selectedLink = el.find("a")[child - 1];
            if (selectedLink){
                selectedLink.click();
                $("body").addClass("loading");
                $("body").append("<div class='spinner-container'><div class='lds-dual-ring'></div></div>");
            }
        }
    });

    $(".stripe").mouseenter(function(e,f) {
        openMenuItem($(this));
    });

    $(".stripe").mouseleave(function() {
        closeMenuItem($(this));
    });

    function openMenuItem(el) {
        
        el.addClass("open");

        el.stop().animate({
            width: '100vw'
        });

        el.find(".content").stop().animate({
            opacity: 1
        });
    }

    function closeMenuItem(el) {
        selectedItem = null;

        el.removeClass("open");

        el.stop().animate({
            width: '40px'
        });
        el.find(".content").stop().animate({
            opacity: 0
        });
    }

});
