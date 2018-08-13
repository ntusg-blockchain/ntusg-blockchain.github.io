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
            container.setAttribute("style", "width:100%; display:block; text-align:center; box-sizing: border-box;font-family: BrandonText;")

            const logoContainer = document.createElement("div");
            logoContainer.setAttribute("class", "py-4")
            logoContainer.setAttribute("style", "position: relative")

            const logo = document.createElement("img");
            logo.setAttribute("src", "/images/logo.svg")
            logo.setAttribute("style", " max-width:60px; border-radius: 6px; box-sizing: border-box;font-family: BrandonText; display: inline-block;")

            const plus = document.createElement("i");
            plus.setAttribute("class", "fas fa-2x fa-plus px-6 py-3 hide-sm hide-md")
            plus.setAttribute("style", "vertical-align: top;")

            const slackLogo = document.createElement("img");
            slackLogo.setAttribute("src", "/images/home/slack-color.png")
            slackLogo.setAttribute("class", "hide-sm hide-md")
            slackLogo.setAttribute("style", " max-width:60px; border-radius: 6px; box-sizing: border-box;font-family: BrandonText; display: inline-block;")

            const span = document.createElement("h2");
            span.setAttribute("style", "width:100%; font-weight: 300; font-size:1.8em; text-align:center; box-sizing: border-box;font-family: BrandonText;")
            span.innerHTML = "Join <strong>"+ res.data.team_name +"</strong> on Slack";

            const input = document.createElement("input");
            input.setAttribute("type", "email")
            input.setAttribute("placeholder", "What is your email address?")
            input.setAttribute("class", "form-control input-lg mt-4")
            input.setAttribute("style", "width:100%; padding: 12px; margin: 6px 0;")
            input.setAttribute("id", "CommunityInviterEmail");

            const button = document.createElement("button");
            button.setAttribute("class", "btn-fancy btn-fancy-blue-reverse no-underline my-3 mt-4");
            button.setAttribute("id", "CommunityInviterSend");
            button.innerHTML = "GET MY INVITE"

            logoContainer.appendChild(logo);
            logoContainer.appendChild(plus);
            logoContainer.appendChild(slackLogo);
            container.appendChild(logoContainer);
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
