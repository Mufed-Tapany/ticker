(function () {
    var newsContainer = document.getElementById("news");
    var newsContainerBottom = document.getElementById("newsBottom");
    var newsLinksTop = newsContainer.getElementsByTagName("A");
    var newsLinksBottom = newsContainerBottom.getElementsByTagName("A");
    var left = newsContainer.offsetLeft;
    var right =
        window.innerWidth -
        newsContainerBottom.offsetLeft -
        newsContainerBottom.offsetWidth; // getting the offsetRight of the bottom container
    var animationId;
    var animationIdBottom;
    var isMovingTop = true;
    var isMovingBottom = true;

    hoverEffect();
    moveNewsTickerTop();
    moveNewsTickerBottom();

    function moveNewsTickerTop() {
        left--;

        if (left <= -newsLinksTop[0].offsetWidth) {
            left += newsLinksTop[0].offsetWidth;
            newsContainer.appendChild(newsLinksTop[0]);
        }

        newsContainer.style.left = left + "px";

        animationId = requestAnimationFrame(moveNewsTickerTop);
    }

    function moveNewsTickerBottom() {
        right--;

        var lastNewsLink = newsContainerBottom.lastElementChild;

        if (right <= lastNewsLink.offsetWidth) {
            right += lastNewsLink.offsetWidth;
            newsContainerBottom.insertBefore(
                lastNewsLink,
                newsContainerBottom.firstChild
            );
        }
        newsContainerBottom.style.right = right + "px";

        animationIdBottom = requestAnimationFrame(moveNewsTickerBottom);
    }

    function hoverEffect() {
        for (var i of newsLinksTop) {
            var link = i;
            isMovingBottom = true;
            link.addEventListener("mousemove", function (event) {
                isMovingTop = false;
                this.style.color = "blue";
                this.style.textDecoration = "underline";
                cancelAnimationFrame(animationId);
            });
            link.addEventListener("mouseleave", function (event) {
                isMovingTop = true;
                this.style.color = "";
                this.style.textDecoration = "";
                moveNewsTickerTop();
                this.stopPropagation();
            });
        }
    }

    for (var i of newsLinksBottom) {
        var link = i;
        link.addEventListener("mousemove", function (event) {
            isMovingBottom = false;
            this.style.color = "blue";
            this.style.textDecoration = "underline";
            cancelAnimationFrame(animationIdBottom);
        });
        link.addEventListener("mouseleave", function (event) {
            isMovingBottom = true;
            this.style.color = "";
            this.style.textDecoration = "";
            moveNewsTickerBottom();
            this.stopPropagation();
        });
    }
})();
