function getGames(){
   let t, a, e, s, d, l, r, n, g, o, i, b, c, u;
    if (document.getElementById("wg-api-hockey-games")) {
        let t = "hockey";
        const a = document.getElementById("wg-api-" + t + "-games");
        let e = a.getAttribute("data-key")
        , s = a.getAttribute("data-host")
        , d = a.getAttribute("data-theme")
        , l = a.getAttribute("data-date")
        , r = a.getAttribute("data-league")
        , n = a.getAttribute("data-season")
        , g = a.getAttribute("data-show-toolbar")
        , i = a.getAttribute("data-show-errors")
        , b = a.getAttribute("data-show-logos")
        , c = a.getAttribute("data-modal-game")
        , u = a.getAttribute("data-modal-standings")
        , $ = parseInt(1e3 * a.getAttribute("data-refresh"));
        if (w(d),
        "" === l && "" === r && "" === n) {
            let t = new Date
            , a = String(t.getDate()).padStart(2, "0")
            , e = String(t.getMonth() + 1).padStart(2, "0")
            , s = t.getFullYear();
            l = s + "-" + e + "-" + a
        }
        let h = m(7, "-")
        , f = m(6, "-")
        , _ = m(5, "-")
        , A = m(4, "-")
        , v = m(3, "-")
        , y = m(2, "-")
        , I = m(1, "-")
        , E = m(0, "+")
        , L = m(1, "+")
        , k = m(2, "+")
        , B = m(3, "+")
        , S = m(4, "+")
        , N = m(5, "+")
        , D = m(6, "+")
        , T = m(7, "+")
        , H = `\n            <div id="wg-${t}-toolbar" class="wg_toolbar">\n                <span class="wg_button_toggle wg_active" data-select="all" data-sport="${t}">ALL</span>\n                <span class="wg_button_toggle" data-select="live" data-sport="${t}">LIVE</span>\n                <span class="wg_button_toggle" data-select="finished" data-sport="${t}">FINISHED</span>\n                <span class="wg_button_toggle" data-select="scheduled" data-sport="${t}">SCHEDULED</span>\n                <span class="wg-dropdown">\n                    <span class="wg-dropbtn" id="wg-${t}-dropbtn">${E}</span>\n                    <div class="wg-dropdown-content">\n                        <a href="#" data-date="${h}" class="wg-date" data-sport="${t}">${h}</a>\n                        <a href="#" data-date="${f}" class="wg-date" data-sport="${t}">${f}</a>\n                        <a href="#" data-date="${_}" class="wg-date" data-sport="${t}">${_}</a>\n                        <a href="#" data-date="${A}" class="wg-date" data-sport="${t}">${A}</a>\n                        <a href="#" data-date="${v}" class="wg-date" data-sport="${t}">${v}</a>\n                        <a href="#" data-date="${y}" class="wg-date" data-sport="${t}">${y}</a>\n                        <a href="#" data-date="${I}" class="wg-date" data-sport="${t}">${I}</a>\n                        <a href="#" data-date="${E}" class="wg-date wg-dropdown-color-select" data-sport="${t}">TODAY</a>\n                        <a href="#" data-date="${L}" class="wg-date" data-sport="${t}">${L}</a>\n                        <a href="#" data-date="${k}" class="wg-date" data-sport="${t}">${k}</a>\n                        <a href="#" data-date="${B}" class="wg-date" data-sport="${t}">${B}</a>\n                        <a href="#" data-date="${S}" class="wg-date" data-sport="${t}">${S}</a>\n                        <a href="#" data-date="${N}" class="wg-date" data-sport="${t}">${N}</a>\n                        <a href="#" data-date="${D}" class="wg-date" data-sport="${t}">${D}</a>\n                        <a href="#" data-date="${T}" class="wg-date" data-sport="${t}">${T}</a>\n                    </div>\n                </span>\n            </div>\n            <div id="wg-${t}-data" class="wg_loader"></div>\n        `;
        "false" === g && (H = `\n                <div id="wg-${t}-data" class="wg_loader"></div>\n            `),
        a.innerHTML = H,
        hockey_games(l, r, n, e, s, i, b, c, u),
        $ >= 15 && Number.isInteger($) && (o = setInterval(function() {
            hockey_games(l, r, n, e, s, i, b, c, u),
            p(t)
        }, $))
    }
}

function m(t, a) {
    let e = new Date;
    "+" == a ? e.setDate(e.getDate() + t) : e.setDate(e.getDate() - t);
    let s = String(e.getDate()).padStart(2, "0")
      , d = String(e.getMonth() + 1).padStart(2, "0");
    return e.getFullYear() + "-" + d + "-" + s
}

async function w(t) {
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

async function hockey_games(e, t, s, a, i, o, n, d, l) {
    var r = new Headers;
    r.append("x-rapidapi-key", a),
    r.append("x-rapidapi-host", i);
    var g = {
        method: "GET",
        headers: r,
        redirect: "follow"
    };
    let c = "https://v1.hockey.api-sports.io/";
    "v1.hockey.api-sports.io" != i && (c = "https://api-hockey.p.rapidapi.com/");
    let m = "?";
    null !== e && "" !== e && ("?" !== m && (m += "&"),
    m += "date=" + e),
    null !== t && "" !== t && ("?" !== m && (m += "&"),
    m += "league=" + t),
    null !== s && "" !== s && ("?" !== m && (m += "&"),
    m += "season=" + s),
    m += "&timezone=" + Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
        const t = await fetch(c + "games" + m, g);
        let s, a, i = await t.json(), r = document.getElementById("wg-hockey-data"), _ = "", p = {}, w = ["P1", "P2", "P3", "OT", "PT"], h = ["BT"], u = ["FT", "AOT", "AP"], y = ["POST", "CANC", "SUSP", "ABD", "AW", "INTR"], $ = !1;
        if (null !== e && "" !== e || ($ = !0),
        "true" === o) {
            for (const e in i.errors)
                console.log(i.errors[e]),
                _ += `\n                    <div class="wg_no_data">${i.errors[e]}</div>\n                `;
            return r.classList.remove("wg_loader"),
            r.innerHTML = _,
            !1
        }
        if (0 === i.results)
            return _ += '\n                <div class="wg_no_data">No Games Available</div>\n            ',
            r.classList.remove("wg_loader"),
            r.innerHTML = _,
            !1;
        i.response.sort(function(e, t) {
            return e.timestamp < t.timestamp ? -1 : e.timestamp > t.timestamp ? 1 : 0
        });
        for (const e in i.response)
            $ ? (p[_date(i.response[e].timestamp)] || (p[_date(i.response[e].timestamp)] = []),
            p[_date(i.response[e].timestamp)].push(i.response[e])) : (p["hockey-" + i.response[e].league.id] || (p["hockey-" + i.response[e].league.id] = []),
            p["hockey-" + i.response[e].league.id].push(i.response[e]));
        document.getElementById("wg-hockey-games") || (_ += '\n                <table class="wg-table" id="wg-hockey-games">\n                    <thead>\n                    </thead>\n            ');
        let k = ""
          , v = "";
        for (const e in p)
            for (const t in p[e]) {
                let i = p[e][t];
                if (!document.getElementById("wg-hockey-games")) {
                    if (v !== i.league.id) {
                        let e = `<span data-sport="hockey" data-league="${i.league.id}" data-season="${i.league.season}" class="wb_header_link wg_load_standings">Standings</span>`;
                        "false" === l && (e = ""),
                        _ += `\n                            <tr id="hockey-league-${i.league.id}">\n                                <td class="wg_header" colspan="9"> ${i.country.name}: ${i.league.name} <span data-id="hockey-league-${i.league.id}" class="wg_arrow wg_arrow_up">&#10095;</span> ${e}</td>\n                            </tr>\n                        `,
                        v = i.league.id
                    }
                    $ && k !== _date(i.timestamp) && (_ += `\n                                <tr id="hockey-date-${_date(i.timestamp)}">\n                                    <td class="wg_header" colspan="9">${_date(i.timestamp)} <span data-id="date-${_date(i.timestamp)}" class="wg_arrow wg_arrow_up">&#10095;</span></td>\n                                </tr>\n                            `,
                    k = _date(i.timestamp))
                }
                let o = i.status.short;
                "NS" == i.status.short && (o = time(i.timestamp)),
                null === o && (o = "");
                let r = "";
                null !== i.status.timer && w.includes(i.status.short) && (r = `<br /><span class="wg_liveTime">${i.timer}<span class="wg_progress">'</span></span>`);
                let g, c = null == i.scores.home ? "" : i.scores.home, m = null == i.scores.away ? "" : i.scores.away, T = "-", f = "-";
                null !== i.periods.first && (T = (g = i.periods.first.split("-"))[0],
                f = g[1]);
                let L = "-"
                  , b = "-";
                null !== i.periods.second && (L = (g = i.periods.second.split("-"))[0],
                b = g[1]);
                let x = "-"
                  , B = "-";
                null !== i.periods.third && (x = (g = i.periods.third.split("-"))[0],
                B = g[1]);
                let I = ""
                  , E = "";
                null !== i.periods.overtime && (I = (g = i.periods.overtime.split("-"))[0],
                E = g[1]);
                let P = ""
                  , H = "";
                null !== i.periods.penalties && (P = (g = i.periods.penalties.split("-"))[0],
                H = g[1]);
                let M, A, S, O, D, z, F, N, G = `<img class="wg_logo" src="${i.teams.home.logo}" loading="lazy" onerror='this.style.display="none"'> ${i.teams.home.name}`, C = `<img class="wg_logo" src="${i.teams.away.logo}" loading="lazy" onerror='this.style.display="none"'> ${i.teams.away.name}`;
                if ("false" === n && (G = `${i.teams.home.name}`,
                C = `${i.teams.away.name}`),
                w.includes(i.status.short) && (M = "wg_liveTime"),
                h.includes(i.status.short) && (M = "wg_breakTime"),
                u.includes(i.status.short) && (M = "wg_finished"),
                y.includes(i.status.short) && (M = "wg_canceled"),
                c > m && (A = "wg_bolder"),
                c < m && (S = "wg_bolder"),
                "P1" == i.status.short && (O = "wg_liveTime"),
                "P2" == i.status.short && (D = "wg_liveTime"),
                "P3" == i.status.short && (z = "wg_liveTime"),
                "OT" == i.status.short && (F = "wg_liveTime"),
                "PT" == i.status.short && (N = "wg_liveTime"),
                document.getElementById("wg-hockey-games"))
                    (s = document.getElementById("hockey-game-" + i.id)).setAttribute("data-status", i.status.short),
                    (a = document.getElementById("hockey-game-status-" + i.id)).setAttribute("data-text", i.status.long),
                    a.classList.remove("wg_liveTime"),
                    a.classList.remove("wg_breakTime"),
                    a.classList.remove("wg_finished"),
                    a.classList.remove("wg_canceled"),
                    a.classList.add(M),
                    a.innerHTML = o + r,
                    (a = document.getElementById("hockey-game-score-" + i.id)).innerHTML = c + "<br />" + m,
                    (a = document.getElementById("hockey-game-first-period-" + i.id)).classList.remove("wg_liveTime"),
                    a.classList.add(O),
                    a.innerHTML = T + "<br />" + f,
                    (a = document.getElementById("hockey-game-second-period-" + i.id)).classList.remove("wg_liveTime"),
                    a.classList.add(D),
                    a.innerHTML = L + "<br />" + b,
                    (a = document.getElementById("hockey-game-third-period-" + i.id)).classList.remove("wg_liveTime"),
                    a.classList.add(z),
                    a.innerHTML = x + "<br />" + B,
                    (a = document.getElementById("hockey-game-overtime-period-" + i.id)).classList.remove("wg_liveTime"),
                    a.classList.add(F),
                    a.innerHTML = I + "<br />" + E,
                    (a = document.getElementById("hockey-game-penalties-period-" + i.id)).classList.remove("wg_liveTime"),
                    a.classList.add(N),
                    a.innerHTML = P + "<br />" + H,
                    (a = document.getElementById("hockey-home-" + i.id)).classList.remove("wg_bolder"),
                    a.classList.add(A),
                    (a = document.getElementById("hockey-away-" + i.id)).classList.remove("wg_bolder"),
                    a.classList.add(S);
                else {
                    let e = `<span class="wg_info wg_tooltip wg_tooltip_left wg_load_game" data-sport="hockey" data-id="${i.id}" data-text="Show Game">?</span>`;
                    "false" === d && (e = ""),
                    _ += `\n                        <tr id="hockey-game-${i.id}" class="hockey-league-${i.league.id} date-${_date(i.timestamp)} hockey-games-select" data-status="${i.status.short}" data-league="${i.league.id}" data-date="${_date(i.timestamp)}">\n                            <td id="hockey-game-status-${i.id}" class="wg_tooltip wg_width_30 wg_text_center ${M}" data-text="${i.status.long}">${o} ${r}</td>\n                            <td>\n                                <span id="hockey-home-${i.id}" class="${A} wg_nowrap">${G}</span>\n                                <br />\n                                <span id="hockey-away-${i.id}" class="${S} wg_nowrap">${C}</span>\n                            </td>\n                            <td id="hockey-game-score-${i.id}" class="wg_width_20 wg_text_center wg_bolder">\n                                ${c}\n                                <br />\n                                ${m}\n                            </td>\n                            <td id="hockey-game-first-period-${i.id}" class="wg_hide_xxs wg_tooltip wg_tooltip_left wg_width_20 wg_text_center ${O}" data-text="First Period">\n                                ${T}\n                                <br />\n                                ${f}\n                            </td>\n                            <td id="hockey-game-second-period-${i.id}" class="wg_hide_xxs wg_tooltip wg_tooltip_left wg_width_20 wg_text_center ${D}" data-text="Second Period">\n                                ${L}\n                                <br />\n                                ${b}\n                            </td>\n                            <td id="hockey-game-third-period-${i.id}" class="wg_hide_xxs wg_tooltip wg_tooltip_left wg_width_20 wg_text_center ${z}" data-text="Third Period">\n                                ${x}\n                                <br />\n                                ${B}\n                            </td>\n                            <td id="hockey-game-overtime-period-${i.id}" class="wg_hide_xxs wg_tooltip wg_tooltip_left wg_width_20 wg_text_center ${F}" data-text="Overtime">\n                                ${I}\n                                <br />\n                                ${E}\n                            </td>\n                            <td id="hockey-game-penalties-period-${i.id}" class="wg_hide_xxs wg_tooltip wg_tooltip_left wg_width_20 wg_text_center ${N}" data-text="Penalties">\n                                ${P}\n                                <br />\n                                ${H}\n                            </td>\n                            <td class="wg_width_20 wg_text_center">\n                                ${e}\n                            </td>\n                        </tr>\n                    `
                }
            }
        document.getElementById("wg-hockey-games") || (_ += "\n                </table>\n            ",
        r.classList.remove("wg_loader"),
        r.innerHTML = _)
    } catch (e) {
        "true" === o && console.log(e)
    }
}
function time(e) {
    let t = new Date(1e3 * e)
      , s = t.getHours();
    return s < 10 && (s = "0" + s),
    s + ":" + ("0" + t.getMinutes()).substr(-2)
}
function _date(e) {
    let t = new Date(1e3 * e)
      , s = t.getFullYear()
      , a = t.getMonth() + 1;
    a < 10 && (a = "0" + a);
    let i = t.getDate();
    return i < 10 && (i = "0" + i),
    s + "-" + a + "-" + i
}