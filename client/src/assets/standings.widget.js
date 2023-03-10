function getStandings(){
    let t, a, e, s, d, l, r, n, g, o, i, b, c, u;

    if (document.getElementById("wg-api-hockey-standings")) {
        const t = document.getElementById("wg-api-hockey-standings");
        let a = t.getAttribute("data-key")
        , e = t.getAttribute("data-host")
        , s = t.getAttribute("data-theme")
        , d = t.getAttribute("data-league")
        , l = t.getAttribute("data-season")
        , r = t.getAttribute("data-show-errors")
        , n = t.getAttribute("data-show-logos");
        hockey_standings(d, l, a, e, r, n, !1)
    }

    function w(t) {
        let a = "./widgets.css"
        , e = "./widgets.css"
        , s = !1
        , d = !1
        , l = document.getElementsByTagName("link");
        for (var r = 0; r < l.length; r++) {
            let t = l[r];
            t.getAttribute("href") === a && (s = !0),
            t.getAttribute("href") === e && (d = !0)
        }
        if ("false" !== t && !s) {
            let t = document.createElement("link");
            t.type = "text/css",
            t.rel = "stylesheet",
            t.href = a,
            document.getElementsByTagName("head")[0].appendChild(t)
        }
        if (("grey" === t || "dark" === t) && !d) {
            let t = document.createElement("link");
            t.type = "text/css",
            t.rel = "stylesheet",
            t.href = e,
            document.getElementsByTagName("head")[0].appendChild(t)
        }
    }
}


/*
t = league
e = season
s = key
l = logos
*/
async function hockey_standings(t, e, s, n, a, l, o=!1) {
    var r = new Headers;
    r.append("x-rapidapi-key", s),
    r.append("x-rapidapi-host", n);
    var d = {
        method: "GET",
        headers: r,
        redirect: "follow"
    };
    let _ = "https://v1.hockey.api-sports.io/";
    "v1.hockey.api-sports.io" != n && (_ = "https://api-hockey.p.rapidapi.com/");
    let g = "?";
    null !== t && "" !== t && ("?" !== g && (g += "&"),
    g += "league=" + t),
    null !== e && "" !== e && ("?" !== g && (g += "&"),
    g += "season=" + e);
    try {
        const t = await fetch(_ + "standings" + g, d);
        let e = await t.json()
          , s = document.getElementById("wg-api-hockey-standings");
        o && (s = document.getElementById("wb-hockey-modal-data"));
        let n = "";
        if ("true" === a) {
            for (const t in e.errors)
                console.log(e.errors[t]),
                n += `\n                    <div class="wg_no_data">${e.errors[t]}</div>\n                `;
            return s.classList.remove("wg_loader"),
            s.innerHTML = n,
            !1
        }
        if (0 === e.results)
            return n += '\n                <div class="wg_no_data">No Standings Available</div>\n            ',
            s.classList.remove("wg_loader"),
            s.innerHTML = n,
            !1;
        n += '\n            <table class="wg-table" id="wg-hockey-standings">\n                <thead>\n                </thead>\n        ';
        let r = !1;
        for (const t in e.response)
            for (const s in e.response[t]) {
                let n = e.response[t][s];
                if (null !== n.points || 0 !== n.points) {
                    r = !0;
                    break
                }
        }
        let i = ""
          , w = "";
        for (const t in e.response)
            for (const s in e.response[t]) {
                let a = e.response[t][s];
                if (i !== a.stage && (n += `\n                        <tr>\n                            <td class="wg_header" colspan="10"> ${a.country.name}: ${a.stage}</td>\n                        </tr>\n                    `,
                i = a.stage),
                w !== a.group.name) {
                    let t = "";
                    r && (t = '<td class="wg_header wg_text_center">P</td>'),
                    n += `\n                        <tr>\n                            <td class="wg_header" colspan="2">${a.group.name}</td>\n                            <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Games Played">GP</td>\n                            <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Win">W</td>\n                            <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Win Overtime">WO</td>\n                            <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Lose">L</td>\n                            <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Lose Overtime">LO</td>\n                            ${t}\n                            <td class="wg_header wg_text_center wg_hide_xs"></td>\n                            <td class="wg_header wg_text_center wg_hide_xs"></td>\n                        </tr>\n                    `,
                    w = a.group.name
                }
                let o = `<img class="wg_logo" src="${a.team.logo}" loading="lazy" onerror='this.style.display="none"'> ${a.team.name}`;
                "false" === l && (o = `${a.team.name}`);
                let d = a.points;
                null === d && (d = "");
                let _ = "";
                r && (_ = `<td class="wg_text_center wg_width_20">${d}</td>`);
                let g = "";
                null !== a.form && (g = (g = (g = (g = (g = a.form.replaceAll("WO", "W")).replaceAll("LO", "L")).replaceAll("W", '<span class="wg_form wg_form_win">W</span>')).replaceAll("D", '<span class="wg_form wg_form_draw">D</span>')).replaceAll("L", '<span class="wg_form wg_form_lose">L</span>'));
                let c = `<span class="wg_info wg_tooltip wg_tooltip_left" data-text="${a.description}">?</span>`;
                null === a.description && (c = ""),
                n += `\n                    <tr>\n                        <td class="wg_text_center wg_bolder wg_width_20">${a.position}</td>\n                        <td>${o}</td>\n                        <td class="wg_text_center wg_width_20">${a.games.played}</td>\n                        <td class="wg_text_center wg_width_20">${a.games.win.total}</td>\n                        <td class="wg_text_center wg_width_20">${a.games.win_overtime.total}</td>\n                        <td class="wg_text_center wg_width_20">${a.games.lose.total}</td>\n                        <td class="wg_text_center wg_width_20">${a.games.lose_overtime.total}</td>\n                        ${_}\n                        <td class="wg_text_center wg_width_90 wg_hide_xs">${g}</td>\n                        <td class="wg_text_center wg_width_20 wg_hide_xs">${c}</td>\n                    </tr>\n                `
            }
        n += "\n            </table>\n        ",
        s.classList.remove("wg_loader"),
        s.innerHTML = n
    } catch (t) {
        "true" === a && console.log(t)
    }
}


