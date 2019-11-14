import React from 'react';
import Axios from 'axios';
import TopNav from 'components/navbar/TopNav'
import BgSvg from 'components/home/BgSvg'
import BgSvg2 from 'components/home/BgSvg2'
import './Home.scss'

var timer
const memberNames = ['kbs', 'lmk', 'yco', 'ldm']
export default class Home extends React.Component {
    state = {
        currentpage: 1,
    }
    pageScroll = (e) => {
        if (!timer) {
            let y = e.deltaY
            if (y > 0) {
                if (this.state.currentpage < 2) {
                    this.state.currentpage++
                }
            } else {
                if (this.state.currentpage > 1) {
                    this.state.currentpage--
                }
            }
            var transY = 100*(this.state.currentpage-1)
            document.querySelector('#home').style.transform = `translateY(-${transY}vh)`
            timer = setTimeout(function() {
                timer = null
            }, 1000)
        }
    }
    modalClose = (i, bg) => {
        var name = memberNames[i]
        // console.log('modalclose!', name)
        document.querySelector('#bgsvg2').classList.remove(`${name}--show`)
        if(bg) document.querySelector('#bgsvg2').classList.remove('modal_bg')
    }
    modalOn = (i) => {
        var name = memberNames[i]
        // console.log('modalOn', name)
        let getClassToRemove = document.querySelector('#bgsvg2').classList[2]
        if(getClassToRemove !== 'hover--enable') document.querySelector('#bgsvg2').classList.remove(getClassToRemove)
        document.querySelector('#bgsvg2').classList.add('modal_bg')
        document.querySelector('#close').addEventListener('click', () => {
            this.modalClose(i, 1)
        })
        document.querySelector('#rect').addEventListener('click', () => {
            this.modalClose(i, 1)
        })
        document.querySelector('#bgsvg2').classList.add(`${name}--show`)
    }
    // home에서 두번째 페이지로 스크롤하면 각자의 소개가 보이도록하는 애니메이션 추가하는 함수, 최초 한번만 동작함.
    animationOn = (e) => {
        if (e.deltaY > 0) {
            let svg2 = document.querySelector('#bgsvg2')
            svg2.classList.add('animate')
            let home2 = document.querySelector('#home2')
            home2.classList.add('star--animate')
            setTimeout(() => {
                // 임시로 delay 1초로 설정해 놓음, 16초로 설정해야함.
                document.querySelector('#bgsvg2').classList.add('hover--enable')
                document.querySelector('#kbs-p').addEventListener('click', () => {
                    // 인자 : memberNames의 index값, const memberNames = ['kbs', 'lmk', 'yco', 'ldm']
                    this.modalOn(0)
                })
                document.querySelector('#lmk-p').addEventListener('click', () => {
                    this.modalOn(1)
                })
                document.querySelector('#yco-p').addEventListener('click', () => {
                    this.modalOn(2)
                })
                document.querySelector('#ldm-p').addEventListener('click', () => {
                    this.modalOn(3)
                })
            }, 1000)
            window.removeEventListener('wheel', this.animationOn)
        }
    }
    modalChange = (i, d) => {
        this.modalClose(i, 0)
        setTimeout(() => {
            this.modalOn(i+d)
        }, 1000)
    }
    addLinks = () => {
        // a tag를 추가하기 위해 html을 재구성하는 코드를 작성하였으나 제대로 동작하지 않음..
        // var kbsNode = document.querySelector('#kbs-info #link')
        // var childLinks = kbsNode.childNodes
        // while (kbsNode.firstChild) kbsNode.removeChild(kbsNode.firstChild)
        // var gitNode = document.createElement("a")
        // gitNode.setAttributeNS("https://github.com/noblesse3539", "xlink:href", "link")
        // gitNode.setAttribute("target", "_blank")
        // gitNode.appendChild(childLinks[0])
        // kbsNode.appendChild(gitNode)
        // kbsNode.appendChild(childLinks[1])
        // var cfNode = document.createElement("a")
        // cfNode.setAttributeNS("http://codeforces.com/profile/opalcat", "xlink:href", "link")
        // cfNode.setAttribute("target", "_blank")
        // cfNode.appendChild(childLinks[2])
        // kbsNode.appendChild(cfNode)
        // console.log(childLinks)
        // console.log(kbsNode)
        // document.querySelector('#kbs-info').appendChild(kbsNode)
    }
    changeCodeforceRank = () => {
        const rankAndColor = {"newbie":"#808080", "pupil": "#008000", "specialist": "#03A89E", "expert": "0000FF", "candidate master": "AA00AA"}
        const codeforcesID = ['opalcat', 'mozzicheek', '', 'dmlimgo']
        const codeforcesUrl = `https://codeforces.com/api/user.info?handles=${codeforcesID[0]};${codeforcesID[1]};${codeforcesID[3]}`
        Axios.get(codeforcesUrl)
            .then(function(res) {
                document.querySelector('#kbs-info #link #codeforces-id').style.fill = `${rankAndColor[res.data.result[0].rank]}`
                document.querySelector('#lmk-info #link #codeforces-id').style.fill = `${rankAndColor[res.data.result[1].rank]}`
                document.querySelector('#ldm-info #link #codeforces-id').style.fill = `${rankAndColor[res.data.result[2].rank]}`
            })
    }
    componentDidMount() {
        // 스크롤하면 한 페이지씩 넘어가게 하는 wheel 이벤트 등록
        window.addEventListener('wheel', this.pageScroll)
        // 처음으로 2번째 페이지 넘어갈 때에만 애니메이션이 작동하는 함수
        window.addEventListener('wheel', this.animationOn)
        for (let i = 0; i < 4; i++){
            if (document.querySelector(`#${memberNames[i]}-info #previous`)) {
                document.querySelector(`#${memberNames[i]}-info #previous`).addEventListener('click', (e) => {
                    this.modalChange(i, -1)
                })
            }
            if (document.querySelector(`#${memberNames[i]}-info #next`)) {
                document.querySelector(`#${memberNames[i]}-info #next`).addEventListener('click', (e) => {
                    this.modalChange(i, 1)
                })
            }
        }
        // this.addLinks()
        this.changeCodeforceRank()
    }
    componentWillUnmount() {
        // 다른 페이지에서는 한 페이지 단위로 넘어가지 않도록 삭제
        window.removeEventListener('wheel', this.pageScroll)
    }
    render() {
        return (
            <div id="home">
                <div id="home1" className="home__aboutteam">
                    <TopNav/>
                    <div className="home__aboutteam__bg">
                        <div className="home__aboutteam__sunlight"/>
                        <div className="home__aboutteam__bgimage">
                            <BgSvg/>
                        </div>
                    </div>
                </div>
                <div id="home2" className="home__abouteach">
                    <div id="stars1"/>
                    <div id="stars2"/>
                    <div id="stars3"/>
                    <BgSvg2/>
                </div>
            </div>
        );
    }
};