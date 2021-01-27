import {HERO, ELEMENTSPOINTS} from "./data.js";
window.onload=()=>{
    if(window.matchMedia("(max-width:899px)").matches){
        let ids = ["top1","top2","left","bottom1","bottom2","right"];
        for(let id of ids){
            document.getElementById(id).remove();
        }
    }

    /*
        This gets the checkboxs checked and iterate it. Each iteration, get your name and iterate
        get the value of HERO's skill specified and add/substraction it of 'value' variable.
        
        P.D:
            If the button `type` is 'magic', the 'check' variable is gems, else is magic. Why?
            Because in the variable 'checksEl' selects all the checkboxs with the class
            'gemsCheck' (if `type` is equal "magic") or 'magicCheck' (if `type` is equal "magic")

            After with the array generated 'checksEl', this iterate it, and
                1) If the `type` is 'gems', in the variable `value` will show the content of 
                    ELEMENTSPOINTS.gems.{diamond}.{fire}, for example, if the user clicked diamond with the fire checked
                    because the follow variable are:
                        grp: the element's group that you did click.
                        elm: the element's name checked of magic group or gems group
                        mag: If the `type` is 'magic', this variable manages the element clicked
                        (This always will be of magic group)
                
                2) If the `type` is 'magic' the execution of `value` will the content of
                    ELEMENTSPOINTS.gems.diamond.ice, for example, if the user clicked the ice with the diamond checked
    */
    function ActionGems(type,element,operator){
        let check = (type == "magic")?"gems":"magic";
        let checksEl = document.querySelectorAll("input." + check + "Check:checked");
        for(let el of checksEl){
            let [grp,elm,mag] = (type == "magic")?[el.name,element,element]:[element,el.name,el.name];
            let value = ELEMENTSPOINTS["gems"][grp][elm];
            for( let skill in ELEMENTSPOINTS["magic"][mag]){
                let op = HERO["skills"][skill];
                (operator == "+")?(HERO["skills"][skill] = op += value):(HERO["skills"][skill] = op -= value);
            }
        }
    }

    /*
       This function allows add or delete points in the skills, depending of the magic's options selected.
       How to this work?
        The function gets three arguments:
            type: This is button's group type clicked
            element: This is the item's name (wind,ruby,hatchet...) clicked
            operator: If the user clicked the button when it was active, so the operator will be '-', else will be '+' (this argument defines the operation's type)
    */
    let ActionSkills=(type,element,operator)=>{
        if(type != "gems"){
            /*
                The buttons' group aren't gems, so all skills' type got by the specificed element's sub-objects are iterated, and each iteration
                gets skill's number and if the skill's type is 'speed' and operator is '+' the operator is become to '-' 
                (because the speed substraction of speed's total count), else if the operator is '-', it is became in '+' (because the button is inactive).

                Finally is add/substraction the value get with the skill's total specificed.

                Also, if the button's group clicked is 'magic', apart from does previous it, this runs the function ActionGems()
            */
            for(let skill in ELEMENTSPOINTS[type][element]){
                let countSkill = ELEMENTSPOINTS[type][element][skill];
                //console.log(skill + ":" + countSkill);
                let op2 = HERO["skills"][skill];
                (operator == "+")?(HERO["skills"][skill] = op2 += countSkill):(HERO["skills"][skill] = op2 -= countSkill);
            }

            (type == "magic")?ActionGems(type,element,operator):null;
        }else{
            /*
                As are gems, the operation is different. So this executes the function ActionGems()
            */
            ActionGems(type,element,operator);
        }

        // Update the skills' points
        loadPoints();
    }

    // Load the points of Attack,Defenser and Speed
    let loadPoints=()=>{
        document.getElementById("attack").textContent = "A:" + HERO.skills.attack;
        document.getElementById("defenser").textContent = "D:" + HERO.skills.defenser;
        document.getElementById("speed").textContent = "S:" + HERO.skills.speed;
    }

    // Show a alert message
    let showAlert=(text,bg)=>{
        (bg == "error")?(bg = "#ff7070"):(bg = "#7bff70");
        document.getElementById("showAlert").textContent = text;
        document.getElementById("showAlert").style.background = bg;
        document.getElementById("showAlert").style.transition = ".8s";
        document.getElementById("showAlert").style.top = "0";
        document.getElementById("showAlert").style.display = "block";
        setTimeout(function(){
            document.getElementById("showAlert").removeAttribute("style");
            document.getElementById("showAlert").textContent = "";
        },3000);
    }

    //Function that is executed if the user clicks the HERO's buttons
    function actionHero(DOM){
        let btnActive = document.querySelector(".btn-active");

        (btnActive)?btnActive.classList.toggle('btn-active'):null;
       
        DOM.classList.add("btn-active"); // add new class 'btn-active'

        document.querySelector("#hero").style.backgroundImage = `url(./img/${DOM.id}.png)`;
        
        // I empty the object
        HERO.name = DOM.id;
        HERO.magic = [];
        HERO.weapons = [];
        HERO.gems = [];
        switch(HERO.name){
            case "witcher":
                var resultSpeed = 17;
                break;
            case "aragon":
                var resultSpeed = 15;
                break;
            case "vampire":
                var resultSpeed = 20;
                break;
            case "sirocu":
                var resultSpeed = 14;
                break;
            default:
                var resultSpeed = 0;
                break;
        }

        HERO.skills = {
            attack:0,
            defenser:0,
            speed:resultSpeed
        }

        /*Each times that, the user clicks a button, it when empty all the object and update the
        character's name, also all the DOM with class 'active' are delete, and his checbox also.*/
        const actives = document.querySelectorAll(".active");
        actives.forEach((element)=>{
            element.classList.remove("active");
            document.querySelector(`#${element.id}Check`).checked = false;
        });
    }

    //Function that is executed is the user clicks the magic's buttons and words' buttons
    function actionDefault(DOM,group){
        let dom = DOM.id;
        /* 
           if the HERO is not selected, this doesn't do nothing, else
           this get his class and if it contains 'active', first looks if the character have more than
           2 gems and if is so the user will need buy more in the store, but else this will add the element in
           the object. (any element's type).

           if the DOM hasn't the 'active' class, this means, that the user to unselected it, so,
           this delete the class 'active' of DOM, the element specific in the object and set the
           checkbox as unselected.
        */
        if(Object.entries(HERO)[0][1] == null){
            showAlert("You should select a character","error");
        }else{
            if(DOM.classList.value.match(/active/gi) == null){
                if(group == "gems" && HERO.gems.length == 2){
                    showAlert("If you want more gems, you should go to store","error");
                }else{
                    HERO[group].push(dom);
                    ActionSkills(group,dom,"+");
                    document.querySelector(`#${DOM.id}`).classList.add("active");
                    document.querySelector(`#${DOM.id}Check`).checked = true;
                }
            }else{
                HERO[group].splice(HERO[group].indexOf(dom),1);
                ActionSkills(group,dom,"-");
                document.querySelector(`#${DOM.id}`).classList.remove("active");
                document.querySelector(`#${DOM.id}Check`).checked = false;
            }
        }
    }

    // For each option, create a eventListener
    function addListener(list,group){
        list.forEach((btn)=>{
            document.querySelector(`#${btn.id.toLowerCase()}`).addEventListener("click",function(){
                (group == "btnHero")?actionHero(this):actionDefault(this,group);
                loadPoints();
            });
        });
    }

    //Active/Inactive the option, when it is clicked
    function checkOption(list){
        list.forEach(function(type){
            let elements = document.querySelectorAll(`.${type}`);
            let group = elements[0].classList.value.replace("Check","");
            elements.forEach(function(item){
                document.getElementById(item.id).addEventListener("click",function(){
                    if(Object.entries(HERO)[0][1] == null){
                        showAlert("You should select a character","error");
                        document.querySelector(`#${this.id}`).checked = false;
                    }else{
                        let elementCheck = item.id;
                        let elementButton = elementCheck.replace("Check","");
                        if(item.checked == true){
                            if(group == "gems" && HERO.gems.length == 2){
                                showAlert("If you want more gems, you should go to store","error");
                                document.querySelector(`#${elementCheck}`).checked = false;
                                return false;
                            }
                            HERO[group].push(elementButton);
                            // Update the skills' points
                            ActionSkills(group,elementButton,"+");
                            document.querySelector(`#${elementButton}`).classList.add("active");
                            document.querySelector(`#${elementCheck}`).checked = true;
                        }else{
                            HERO[group].splice(HERO[group].indexOf(elementButton),1);
                            // Update the skills' points
                            ActionSkills(group,elementButton,"-");
                            document.querySelector(`#${elementButton}`).classList.remove("active");
                            document.querySelector(`#${elementCheck}`).checked = false;
                        }
                    }
                });
            });
        });
    }
    let chooseOptions=()=>{
        let typeSelect = ["btnHero","weapons","gems","magic"];
        let typeCheck = ["weaponsCheck","gemsCheck","magicCheck"];

        // For each item's type, get the group, and the btns
        typeSelect.forEach(type=>{
            let group  =  type;
            const btns = document.querySelectorAll(`.${type}`);
            // For each option, create a eventListener
            addListener(btns,group);
        });

        //Active/Inactive the option, when it is clicked
        checkOption(typeCheck);
    }
    let init=()=>{
        loadPoints();
        chooseOptions();
    }
    init();
}