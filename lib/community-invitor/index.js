var CommunityInviter = {
    team_id: "",
    app_url: "",
    init: function (data) {
        if (!data) return console.log("Community Inviter, Missing fields.")
        if (!data.team_id || !data.app_url) return console.log("Community Inviter, app_id and app_type not found!");
        CommunityInviter.team_id = data.team_id;
        CommunityInviter.app_url = data.app_url;
    },
    worker: function () {
        if (!CommunityInviter.app_url || !CommunityInviter.team_id) return console.log("Community Inviter : app_url or team_id not found!");
        if (!document.getElementById("CommunityInviter")) return console.log("Community Inviter : Please add this code where your like : " + "<div id='CommunityInviter'></div>")
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "https://communityinviter.com/api/app-control", true);
        ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        ajax.onreadystatechange = function () {
            if (ajax.readyState != 4 || ajax.status != 200) return;
            var res = JSON.parse(ajax.response);
            const container = document.querySelector("#CommunityInviter");
            container.setAttribute("style", "width:100%; display:block; text-align:center; box-sizing: border-box;font-family: Helvetica Neue,Helvetica,Arial,sans-serif;")

            const logo = document.createElement("img");
            logo.setAttribute("src", res.data.team_icon)
            logo.setAttribute("style", " max-width:100px; border-radius: 6px; margin-bottom:15px; box-sizing: border-box;font-family: Helvetica Neue,Helvetica,Arial,sans-serif;")

            const span = document.createElement("div");
            span.setAttribute("style", "width:100%; font-weight: 300; font-size:1.3em; text-align:center; box-sizing: border-box;font-family: Helvetica Neue,Helvetica,Arial,sans-serif;")
            span.innerHTML = "Join <strong>"+ res.data.team_name +"</strong> on Slack";

            const input = document.createElement("input");
            input.setAttribute("type", "email")
            input.setAttribute("placeholder", "What is your email address?")
            input.setAttribute("style", "width:100%; width: 100%; padding: 12px; margin: 6px 0; box-sizing: border-box;font-family: Helvetica Neue,Helvetica,Arial,sans-serif;")
            input.setAttribute("id", "CommunityInviterEmail");

            const button = document.createElement("button");
            button.setAttribute("style", "width: 100%;padding: 6px 12px;margin: 6px 0;background-image: none;-o-border-image: none;border-image: none;border: 1px solid #3498db;background-color: #3498db;color: #fff;font-weight: 700;font-size: 1.1em;");
            button.setAttribute("id", "CommunityInviterSend");
            button.innerHTML = "GET MY INVITE"

            container.appendChild(logo);
            container.appendChild(span);
            container.appendChild(input);
            container.appendChild(button);

            document.getElementById("CommunityInviterSend").addEventListener("click", function(e){

                var email = document.getElementById("CommunityInviterEmail").value;
                if (!email || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return alert("Unsupperted email address !")
                e.target.innerHTML = "Loading..."
                e.target.disabled = true;
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "https://communityinviter.com/api/basic-invite", true);
                ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                ajax.onreadystatechange = function () {
                    if (ajax.readyState != 4 || ajax.status != 200) return;
                    e.target.innerHTML = "GET MY INVITE"
                    e.target.disabled = false;
                    var res = JSON.parse(ajax.response);
                    if (res.code == 0) return alert(res.error);
                    alert("Success! Your invite request has been sent.")
                }
                ajax.send(JSON.stringify({
                    team_domain: CommunityInviter.team_id,
                    badge_url: CommunityInviter.app_url,
                    user: email
                }))
            })
        };
        ajax.send(JSON.stringify({
            team_domain: CommunityInviter.team_id,
            app_url: CommunityInviter.app_url
        }))
    }
}
window.CommunityInviterAsyncInit()
CommunityInviter.worker()
