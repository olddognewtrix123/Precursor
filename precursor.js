var ButtonsAndGrid = React.createClass({
      getInitialState: function() {
        return {
          GameStatus: 'stopped',
          testPosition: 0,
          GameOver: 0,
          currentDungeonLevel: [],
          currentLevel: 1,
          totalColumns: 40,
          totalRows: 42,
          masterArray: [],
          mrBluesPosition: 0,
          mrBlueHealth: 50,
          weaponPower: 50,
          experiencePoints: 0,
          thisLevelKillCount: 0,
          dungeonLevel1: [],
          dungeonLevel2: [], 
          zPlus: 0,
          zPlusArray: [],
          isZplus:0,
          assumeZmoves:1,
          runRunRUNmodalActive: 0,
          divimage: "https://www.w3schools.com/tags/smiley.gif",
          wormPursuit: 0,
          numberOfRedWorms: 0,
          wormPursuitIteration: 0,
          lastZmessage0: "no z's yet!",
          lastZmessage1: "no z's yet!",
          zPlusArray0: "no z's yet!",
          randomMessageArray: [],
          randomPositionsArray: [],
          newTempArray: [],
          ironCondition: 0,
          vitriolCondition: 0,
          mrBlueCondition: 0,
          coagulatorCondition: 0,
          levelMessage: "Welcome to Precusor! You are at Level 1. To attain Enlightenment, and to Ascend bodily to the next level of wisdom, carry out the following Arcanum that comes to us from Albertus Magnus:",
          levelMessageCondition: 0,
          temporaryPositionArray: [], // for each level, this keeps track of which locations are already assigned a moster weapon or treasure
          message: "Find ye the Iron, and find ye the Oil of Vitriol; combineth both in the Coagulator. Use the arrows to move. Oh, and don't get eaten!"
        };     
      },
  
   componentWillMount: function() {
     console.log("componentWillMount");
        this.createDungeonLevels();  
        document.addEventListener("keydown", this.playerMove);  
       },
  
      componentDidMount: function() {     
        console.log("componentDidMount");
        this.generateMrBlue();
        document.addEventListener("keydown", this.playerMove);
        window.focus(); 
      },
  
      createDungeonLevels: function() {
        for(var g = 1; g<4; g++){      
          // evaluatedArray is the original map of floors and walls for that level
          // newArray is a copy of evaluatedArray for that level
          // newArray gets sent to aMW&Ts
          // newArray gets monsters and treasures added to it by aMW&ts
            var evaluatedArray = this.generateRandomLevel();  
            var newArray = [];
            var i;
            var evaltotal = this.state.totalColumns * this.state.totalRows;
             for ( i = 0; i < evaltotal; i++) 
             {  // copies the base map over to an array for evaluation
               var adjacent = 0;
               if(evaluatedArray[i] === "light grey")
               {  
                 if(evaluatedArray[i + this.state.totalColumns]==='light grey')
                  {
                    newArray.push('grey');
                  }
                 else
                  {
                   newArray.push(evaluatedArray[i]);
                  }
               }
               else
               {
                 newArray.push(evaluatedArray[i]);
               }
             } 
          this.setState({
              newTempArray: evaluatedArray
           }); 
          newArray = this.addMonstersWeaponsAndTreasures(newArray);
          
        if(g === 1){
            this.setState({
              dungeonLevel1: newArray
           });  
           this.setState({
             currentDungeonLevel: newArray
           });  
        }
          else if(g === 2){
            this.setState({
              dungeonLevel2: newArray
           }); 
          }
          else if(g === 3){
            this.setState({
              dungeonLevel3: newArray
           }); 
          }
         else{ 
          this.setState({
              dungeonLevel4: newArray
           }); 
         }
        }
	console.log("createDungeonLevels has completed.");
       }, // END OF createDungeonLevels
  
 addMonstersWeaponsAndTreasures: function(k){
        var listOfRandomPositions = [];
        while ( listOfRandomPositions.length < 19) 
        {  
          var pushme = this.getRandomStartingPosition(k); 
            if(listOfRandomPositions.length === 0)
              {
                listOfRandomPositions.push(pushme);
              }
            else
              {
                var test = listOfRandomPositions.indexOf(pushme)
                if (test === -1)
                  {
                  listOfRandomPositions.push(pushme);
                  }
                else{console.log("Already taken!");}
              }
        }
        var arrayWithMonstersWeaponsAndTreasures = [];
        var gridtotal2 = this.state.totalColumns * this.state.totalRows;
          for (var p = 0; p < gridtotal2; p++) {
            if(p === listOfRandomPositions[0])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');} // trigger color for a Mystery Chest that hides a Worm
            else if(p === listOfRandomPositions[1])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[2])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[3])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[4])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[5])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[6])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[7])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[8])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[9])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[10])
              {arrayWithMonstersWeaponsAndTreasures.push('green');
                console.log(p + " is hiding the coagulator!")
              } // trigger color for coagulator
            else if(p === listOfRandomPositions[11])
              {arrayWithMonstersWeaponsAndTreasures.push('azure');
                console.log(p + " is hiding the acid!")
              } // trigger color for for a Mystery Chest that hides Oil of Vitriol
            else if(p === listOfRandomPositions[12])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[13])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[14])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[15])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[16])
              {arrayWithMonstersWeaponsAndTreasures.push('gold');
                console.log(p + " is hiding the iron!")
              } // trigger color for for a Mystery Chest that hides Iron
            else if(p === listOfRandomPositions[17])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if(p === listOfRandomPositions[18])
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[19]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[20]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[21]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[22]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[23]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[24]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[25]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[26]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[27]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[28]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[29]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[30]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[31]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[32]) || (this.state.currentLevel >= 2)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
              else if((p === listOfRandomPositions[33]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[34]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[35]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[36]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[37]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[38]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[39]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[40]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[41]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[42]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[43]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[44]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[45]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            else if((p === listOfRandomPositions[46]) || (this.state.currentLevel === 3)) 
              {arrayWithMonstersWeaponsAndTreasures.push('purple');}
            
            else{arrayWithMonstersWeaponsAndTreasures.push(k[p])}
          }
        this.setState({
          temporaryPositionArray: []
        })
        
        return(arrayWithMonstersWeaponsAndTreasures)
	
      },
  
  generateMrBlue: function() {   
    console.log("generateMrBlue");
         var tempArrforMrBlue = [],
             dungeonLevelToRender = this.state.currentDungeonLevel;
         var randomStartingPosition = this.getRandomStartingPositionForMrBlue();
         var gridtotal7 = this.state.totalColumns * this.state.totalRows;
          for (var p = 0; p < gridtotal7; p++) {
            if(p === randomStartingPosition)
              {tempArrforMrBlue.push('blue');
              }
            else if(p === randomStartingPosition+143 || p === randomStartingPosition+145 || p === randomStartingPosition+144 || p === randomStartingPosition-143 || p === randomStartingPosition-145 || p === randomStartingPosition-144 || p === randomStartingPosition-48 || p === randomStartingPosition-49 || p === randomStartingPosition-50 || p === randomStartingPosition-47 || p === randomStartingPosition-46 || p === randomStartingPosition-45 || p === randomStartingPosition-51 ||
                    p === randomStartingPosition+45 || p === randomStartingPosition+48 || p === randomStartingPosition+47 || p === randomStartingPosition+46 || p === randomStartingPosition+49 || p === randomStartingPosition+50  || p === randomStartingPosition+51  ||
                    p === randomStartingPosition-96 || p === randomStartingPosition-97 || p === randomStartingPosition-98 || p === randomStartingPosition-95 || p === randomStartingPosition-94 || p === randomStartingPosition+96 || p === randomStartingPosition+95 || p === randomStartingPosition+94 || p === randomStartingPosition+97 || p === randomStartingPosition+98  ||
                    p === randomStartingPosition+1 || p === randomStartingPosition-1 || p === randomStartingPosition+2 || p === randomStartingPosition-2 || p === randomStartingPosition-3 || p === randomStartingPosition+3)
              {tempArrforMrBlue.push(dungeonLevelToRender[p])}
            else{tempArrforMrBlue.push('black')}
            //else{tempArrforMrBlue.push(dungeonLevelToRender[p])}
          }
    this.setState({
          mrBluesPosition: randomStartingPosition
        });
        this.setState({
          masterArray: tempArrforMrBlue
        });
    this.setState({
          randomMessageArray: ["Ere Chymes drew breath, this darkness was deep!", "Verily, this darkness would vex Hermes himself!", 

"Zosimos' zippers, it's dark in here!", "Fie, this darkness would madden a bat!", 

"The Ladder of Wisdom unites Earth and Heaven!", 

"Alack, this labrynth hath no end!", 

"Separate thou ye earth from ye fire, ye subtle from ye gross sweetly with great industry.", 

"Perchance, these dark corridors will yet reveal their secrets?", 

"The Ancient Sages long sought a way to increase the power and efficiency of the Lapidis Stibil", 

"Take care always to help and counsel the poor.", 

"Mercury is the permanent water without which nothing takes place!", 

"By the Dictums of Iximidrus, I'm really lost down here!",

"The aim of the Alchemist is to bring about Transmutation!", 

"The light that shines from the Alchemist's furnace illumines the recesses of Nature's secrets!", 

"There are two ways of knowing reality, the Lunar consciousness and the Solar. I prefer the Solar.", 

"The four steps of prayer are Gratitude, then Humility, then Contrition, then Supplication.", 

"Mammas, don't let your babes grow up to be alchemists!", 

"These halls are dark, but the mind glows with curiosity!", 

"Great Coins of Arisleus, it is really dark down here!", 




"Zosimos' zippers, it's dark in here!", "Fie, this darkness would madden a bat!", 

"The Ladder of Wisdom unites Earth and Heaven!", 

"Alack, this labrynth hath no end!", 

"Separate thou ye earth from ye fire, ye subtle from ye gross sweetly with great industry.", 

"Perchance, these dark corridors will yet reveal their secrets?", 


"Mercury is the permanent water without which nothing takes place!", 

"The aim of the Alchemist is to bring about Transmutation!", 

"The light that shines from the Alchemist's furnace illumines the recesses of Nature's secrets!", 

"There are two ways of knowing reality, the Lunar consciousness and the Solar. I prefer the Solar.", 

"The four steps of prayer are Gratitude, then Humility, then Contrition, then Supplication.", 

"Mammas, don't let your babes grow up to be alchemists!", 

"These halls are dark, but the mind glows with curiosity!",

"Thither lets us go into this abysimal darkness!", 

"The neophyte is enjoined to become as simple and pure as the nature he or she wishes to understand!", 

"A pious soul, when joined with an iron will, can find the keys to the gates of truth!", 

"The Alchemist must arrange matter within its chaos.", 

"By Artephius' teeth, it's dark in here!", 

"Zounds, I stubbed my toe!", 

"Gadzooks, where does it end!", 

"By the Dictums of Iximidrus, I'm really lost down here!",
"The Ancient Sages long sought a way to increase the power and efficiency of the Lapidis Stibil", 

"Take care always to help and counsel the poor.",


 

"Great Coins of Arisleus, it is really dark down here!",

"Consarn it, I really can't see anything down here!", 

"By Al-Farbi's foot, this is very dark.", 

"As soon as fire has become air, the inferior grosser waters and earth mix therewith.", 

"The soluble Earth is Volatile, its salt is sooner dissolved by water than pebble or sand.", 

"Alchemy is only learned by making mistakes. Eschew experimenting with explosives!!!", 

"Pray, read, re-read, work, and you shall find!", 

"You know, an Alchemist could get lost down here!", 

"Not since I delved into the chronicles of Agathodaemon have I encountered such darkess!", 

"Within everything is the seed of everything!", 

"I have an intense dislike of giant man-eating worms", 

"An alchemist drinks lots of water to stay hydrated, but SHOULD NEVER DO SO IN THE LAB!", 

"Gosh, I hope I don't get eaten", 

"I desire Enlightenment!", 

"I seek Ascension!", 

"True disciples of Wisdom are all brothers and sisters, divided only by time and place!", 

"Nature chastises the Alchemist!", "The operations of Alchemy seek to mimic the creation of the Universe itself!", 

"That which is above is like that which is below!", 

"All things arise from the One by the work of the One, by adaptation.", 

"The athanor, Old Lame Vulcan, is the heart of your lab, the soul of your operations", 

"If you rectify this volatile mixture over a steam bath, it becomes luminous, which is proof it contains air and fire.", 

"The Lyfe so short, the Craft so long to Learn!", 

"In the Balneo you will find the blessed bloodred Oleum Antimonii in the retort, which should be taken out very carefully.", 

"Maybe I'll find Roger Bacon down here...", 

"Why did I decide to delve into Alchemy? Why?", 

"The Stone is the catalyst that completes the transmutation of metals!", 

"My father told me to enter the Clergy. Shoulda' listened perhaps.", 

"The path to Wisdom is arduous, fraught with many traps and dead ends.", 

"To learn anything of value, it takes a lyfe of dedication.", 

"One is the whole, and from this comes all!", 

"Have I sought the Arcanum in vain? Will the Lodestone always beckon?", 

"I'm beginning to have doubts down here.", 

"Fear of the Lord is truly the Beginning of Wisdom",

"To be a true Adept of the Alchemical, one must be willing to get lost in the darkness!", 

"Marvelous are the Operations accomplished by the work of the Sun!", 

"As above, so below!", 

"Be careful to understand the Philospher's stone; ou will have attained a clear understanding of Nature!",

"The Albedo is the intermediate perfection of the Philosopher's stone.", 

"The path to Knowlege is oft shrouded in a vale of such gloom.", 

"Verily, one eye is good but two are better. Wear goggles in the lab!",
 
"To say that common nitre and the Philosopher's nitre are distinct and different, is folly and superstition.",

"The cause of the sun's explosion downwards is because it is a fixed earth which inclines downwards, whereas gunpowder shows its greatest force upwards.",
 
"The water is the body, the Vehicle and Tool, but the spirit is the Universal Agent and fabricator of all Natural Things.", 

"Those whome Wisdom loves, she chastises!", "Do not court death by the errors of your ways!", 

"I could reveal something here, but as it would be abused by profligate men, I am obliged to be silent.", 

"Antimony is in the parts of Saturn and in nature, in all its modes.", 

"Corporified Anima Mundi is but little known, although it may be got in great quantity.", 

"God endowed the Principle Fire with an unerring instinct, and a capacity to manifest itself in 3 Ways.", 

"The fixation of nitre is done more expeditiously with quicklime viva, rather then by the detonation with charcoal or sulphur",

"Putrefaction is the author of destruction and regeneration of all things.", 

"Through fire, at the end of a series of long and complex oerations, the Alchemist draws a new body from the Athanor!", 

"Heaven and air have their influence not upward, but downwards, toward earth and water.",
 
"By Mercury and Anubis, these depths are passing strange!", "So, three alchemists walk into a bar...",
 
"The breath in our nostrils is a puff of smoke, reason a spark from the beating of our hearts.", 

"Wretched are they who scorn Wisdom and Discipline!"]
        });
       }, // END OF generateMrBlue
  
moveMrBlue: function(n) {  // what gets passed to moveMrBlue is the NEW position
  if(this.state.levelMessageCondition === 0)
    {
        this.setState({
              levelMessageCondition: 1
          });
      
        this.setState({
              levelMessage: "You are at Level 1! FInd the Iron and find the Oil of Vitriol. Put both in the Coagulator to effect the Alchemical operation for this level. Oh, and do not die!"
          });
      
      
    }
  if(this.state.currentLevel === 2)
    {
      this.setState({
              levelMessage: "You have reached LEvel 2! "
          });
    }
  
  if(this.state.currentLevel === 3)
    {
      this.setState({
              levelMessage: "You have reached the third and final level! "
          });
    }
         this.runRunRUN();
         var dungeonLevelToRender = this.state.currentDungeonLevel;
         var mrBluesPresentPosition = this.state.mrBluesPosition;
    if(dungeonLevelToRender[n] === 'grey'){
          var messageArray = this.state.randomMessageArray
          var randomMessageValue = Math.floor((Math.random() * messageArray.length) + 0);
          var randomMessage = messageArray[randomMessageValue];
          this.setState({
              message: randomMessage
          });
      
      this.setState({
              testPosition: n
          });
      
      
         this.updatePosition(n);
         this.updateDungeonMap(n); 
    }
    else if(dungeonLevelToRender[n] === 'purple')  // mrBlue  encounters a Mystery Chest that hides a Worm OR some other beast depending on level                                        
              {         
              //  var stayPut = this.state.mrBluesPosition;
                      this.addZplus(n);
                this.setState({
                    numberOfRedWorms: this.state.numberOfRedWorms + 1
                  });
             //   this.updatePosition(stayPut);
                this.updateDungeonMap2(n); 
                this.setState({wormPursuit: 1}); // this tells any worms with background Pink to start chasing mrBlue
                this.setState({wormPursuitIteration: 0});
                if(this.state.currentLevel === 2)
                  {
                    this.setState({message: "Fie! A repugnant Dicephaelus! Flee!!!"}); 
                  }
                else if(this.state.currentLevel === 3)
                  {
                    this.setState({message: "Egads! A giant Fiend! Escape!!!"}); 
                  }
                else
                  {
                    this.setState({message: "Forsooth! A vile Worm! Run!!!"}); 
                  }
                                
              }
    else if(dungeonLevelToRender[n] === 'red')          // mrBlue encounters a Worm that is unhidden OR some other beast depending on level                                                       
              {         
                this.setState({
                  GameOver:1
                })
                this.updatePosition(n);
                this.updateDungeonMap2(n); 
                this.setState({wormPursuit: 1}); 
                this.setState({wormPursuitIteration: 0});
                this.setState({message: "Yum!!"});  
                this.setState({
                mrBluesPosition: 9000
                });
              }
    else if(dungeonLevelToRender[n] === 'green') // mrBlue encounters a Mystery Chest that hides a Coagulator
    { 
      this.updateDungeonMap3(n); // makes the Coagulator appear (green changes to pink)
      
      if(this.state.currentLevel === 2)
        {
          this.setState({
              message: "You have uncovered the Alembic!"
          });
        }
      else if(this.state.currentLevel === 3)
        {
          this.setState({
              message: "You have uncovered the Athanor!"
          });
        }
      else
        {
          this.setState({
              message: "You have uncovered the Coagulator!"
          });
        }
      
      if(this.state.mrBlueCondition ===1) // mrBlue encounters a Mystery Chest that hides a Coagulator while carrying Vitriol (OR Blue Stone)
      {
        this.setState({
               mrBlueCondition: 0
              })
              
              this.setState({
               vitriolCondition: 1  // this means the vitriol (or the Blue Stone) has now been deposited in the coagulator
              })
              
        if(this.state.currentLevel === 2)
        {
          this.setState({
              message: "You have set the Blue Stone in the Alembic. Now, seek out the Salt of Alembroth!"
          });
        }
        else if(this.state.currentLevel === 3)
        {
          this.setState({
              message: "You have set the Aqua Vitae in the Athanor. Now, seek out the Lactusa Virosa!"
          });
        }
        else
          {
            this.setState({
              message: "You have set the Oil of Vitriol in the Coagulator. Now, seek out the Iron!"
              });
          }
              
      }
      else if(this.state.mrBlueCondition === 2)// mrBlue encounters a Mystery Chest that hides a Coagulator while carrying Iron OR has encountered a Mystery Chest that hides a Alembic while carrying Salt of Alembroth
        { 
              this.setState({
               mrBlueCondition: 0
              })
              
              this.setState({
               ironCondition: 1  // this means the iron(OR the Salt of Alembroth) has now been deposited in the coagulator
              })
              
          if(this.state.currentLevel === 2)
            {
              this.setState({
              message: "You have set the Salt of Alembroth in the Alembic. Now, seek out the Blue Stone!"
              });
            }
      else if(this.state.currentLevel === 3)
            {
              this.setState({
              message: "You have set the Lactusa Virosa in the Athanor. Now, seek out the Aqua Vitae!"
              });
            }
          else
            {
              this.setState({
              message: "You have set the Iron in the Coagulator. Now, seek out the Oil of Vitriol!"
              });
            }
              
            
        }         
      else                        // mrBlue encounters a Mystery Chest that hides a Coagulator (OR an Alembic) while empty handed
        {
             this.setState({
               mrBlueCondition: 0
              })
        }
      
    }
    else if(dungeonLevelToRender[n] === 'pink')// mrBlue encounters an unhidden Coagulator (OR an unhidden Alembic)
    { 
      

      if (this.state.mrBlueCondition === 1) // mrBlue encounters an unhidden Coagulator while carrying Vitriol (OR Blue Stone)
        {
        // mrBlue encounters an unhidden Coagulator while carrying Vitriol and has already deposited iron in the coagulator but not vitriol (OR Mr Blue encounters an unhidden Alembic while carrying Blue Stone and has already deposited Salt of Alembroth in the Alembic but not Blue Stone)
          if(this.state.ironCondition === 1 && this.state.vitriolCondition === 0 )
          {
            if(this.state.currentLevel === 2)
              {
                   this.setState({
                  message: "You have ascended to Level 3! "
                });
              }
              else if(this.state.currentLevel === 3)
              {
                   this.setState({
                  message: "You are now an Alchemical Adept. You have won the game!"
                });
              }
            else
              {
                 this.setState({
                    message: "You have ascended to Level 2! Follow the metallurgical Dictates of Agricola: find Blue Stone, deposit it along with Salt of Alembroth into the Alembic, and Ye shall come away with Brimstone! "
                  });               
              }
            
            
            this.setState({
              ironCondition: 0
            });
            
            this.setState({
              ironCondition: 0
            });
            
            this.setState({
              vitriolCondition: 0
            });
            
            this.setState({
              mrBlueCondition: 0
            });
            
            this.setState({
              coagulatorCondition: 0
            });
            
            this.setState({
              levelMessage: "You have attained Level 2!"
            });

            if(this.state.currentLevel === 2)
              {
                var upNext = this.state.dungeonLevel2;
              }
            else
              {
                var upNext = this.state.dungeonLevel3;
              }
            
            this.setState({
             currentDungeonLevel: upNext
           }); 
            
            var mrBlueLevel2StartingPosition = this.getRandomStartingPositionForMrBlue();

           this.updateDungeonMapTONEXTLEVEL(mrBlueLevel2StartingPosition); 

          }
        // mrBlue encounters an unhidden Coagulator while carrying Vitriol and has already deposited vitriol in the coagulator)
          else if(this.state.ironCondition === 0 && this.state.vitriolCondition === 1)
          {
            this.updateDungeonMap(n); 
            
            this.setState({
              message: "You have already deposited vitriol into the Coagulator! Now, go seek Iron!"
            });
            
            this.setState({
              mrBlueCondition: 0
            })
          }
       // mrBlue encounters an unhidden Coagulator while carrying Vitriol and hasn't deposited anything yet in the coagulator (OR while carrying Blue Stone and hasn't deposited anything yet in the Alembic)
          else
            { 
              this.updateDungeonMap(n); 
              
              if(this.state.currentLevel === 2)
                {
                    this.setState({
                      message: "You have deposited Blue Stone into the Alembic! Now, go seek Salt of Alembroth!"
                  });
                }
              else if(this.state.currentLevel === 3)
                {
                    this.setState({
                      message: "You have deposited Aqua Vitae into the Athanor! Now, go seek Lactusa Virosa!"
                  });
                }
              else
                {
                    this.setState({
                      message: "You have deposited vitriol into the Coagulator! Now, go seek Iron!"
                    });
                }
              
            
              this.setState({
              vitriolCondition: 1
             })
              
            this.setState({
              mrBlueCondition: 0
            })
            }
        } 
      else if (this.state.mrBlueCondition === 2)// mrBlue encounters an unhidden Coagulator while carrying Iron (OR encounters an unhidden Alembic while carrying Salt of Alembroth)
        {
          // mrBlue encounters an unhidden Coagulator while carrying Iron and has already deposited iron in the coagulator but not vitriol
          if(this.state.ironCondition === 1 && this.statevitriolCondition === 0)
            {
              this.setState({
              message: "You have already deposited Iron into the Coagulator! Now, go seek the Oil of Vitriol!"
            });
            
            this.setState({
              mrBlueCondition: 0
            })
            }
            // mrBlue encounters an unhidden Coagulator while carrying Iron and has already deposited vitriol in the coagulator (OR alembic)
          else if(this.state.ironCondition === 0 && this.state.vitriolCondition === 1)
            {
              if(this.state.currentLevel === 2)
                {
                     this.setState({
                        message: "You have ascended to Level 3! "
                    });
                }
              else if(this.state.currentLevel === 3)
              {
                   this.setState({
                  message: "You are now an Alchemical Adept. You have won the game!"
                });
              }
              else
                {
                    this.setState({
                      message: "You have ascended to Level 2! Follow the metallurgical Dictates of Agricola: find Blue Stone, deposit it along with Salt of Alembroth into the Alembic, and Ye shall come away with Brimstone! "
                      });
                }
              
            
            this.setState({
              ironCondition: 0
            });
            
            this.setState({
              ironCondition: 0
            });
            
            this.setState({
              vitriolCondition: 0
            });
            
            this.setState({
              mrBlueCondition: 0
            });
            
            this.setState({
              coagulatorCondition: 0
            });
            
            this.setState({
              levelMessage: "You have attained Level 2!"
            });

            
            var upNext = this.state.dungeonLevel2;
            
            this.setState({
             currentDungeonLevel: upNext
           }); 
            
            var mrBlueLevel2StartingPosition = this.getRandomStartingPositionForMrBlue();

           this.updateDungeonMapTONEXTLEVEL(mrBlueLevel2StartingPosition); 
            }
             // mrBlue encounters an unhidden Coagulator while carrying Iron that has nothing in it already (OR encounters an ampty alembic while carrying Salt of Alembroth)
          else
            {
              
              if(this.state.currentLevel === 2)
                {
                        this.setState({
                              message: "You have found the Alembic and deposited the Salt of Alembroth! Now, go seek the Blue Stone!"
                        });
                }
              else if(this.state.currentLevel === 3)
                {
                        this.setState({
                              message: "You have found the Athanor and deposited the Lactusa Virosa! Now, go seek the Aqua Vitae!"
                        });
                }
              else
                {
                      this.setState({
                            message: "You have found the Coagulator and deposited the Iron! Now, go seek the Oil of Vitriol!"
                      });
                }
              
              
              this.setState({
              ironCondition: 1
              });
              
              this.setState({
              mrBlueCondition: 0
            })
            }
        }    
      else   // mrBlue is carrying neither 
        {
          if(this.state.currentLevel === 2)
            {
              this.setState({
              message: "You have found the Alembic! To attain purity and wisdom, seek you the Salt of Alembroth and with it the Blue Stone!"
              });
            }
          else if(this.state.currentLevel === 3)
                {
                        this.setState({
                              message: "You have found the Athanor and deposited the Aqua Vitae! Now, go seek the Lactusa Virosa!"
                        });
                }
          else
            {
              this.setState({
                message: "You have found the Coagulator! What is required to attain Enlightenment is the Iron and also the Oil of Vitriol!"
              });
            }
          
        }
    }
    else if(dungeonLevelToRender[n] === 'azure') //mrBlue encounters a Mystery Chest that hides Oil of Vitriol (OR hides the Blue Stone)
    { 
      // you do want the map to update but you need to account for when mrBlue already carrying iron
      this.updateDungeonMap4(n); 
      
      // if mrBlueCondition === 2 (mrBlue is carrying iron OR the Salt of Alembroth)
      if(this.state.mrBlueCondition === 2)
        {
        // send message that the iron needs to be deposited in the coagulator first
         if(this.state.currentLevel === 2)
           {
             this.setState({
               message: "You have found Blue Stone, but first you must deposit into the Alembic the very Salt of Alembroth that you carry!!"
              });
           }
          else if(this.state.currentLevel === 3)
                {
                        this.setState({
                              message: "You have found Aqua Vitae, but first you must deposit into the Athanor the very Lactusa Virosa that you carry!!"
                        });
                }
          else
            {
              this.setState({
                message: "You have found Oil of Vitriol but first you must deposit the Iron you carry into the Coagulator!"
              });
            }
          
        }
      // else
      else
        {
          if(this.state.currentLevel === 2)
            {
              this.setState({
                message: "You have found Blue Stone!"
              }); 
            }
          else if(this.state.currentLevel === 3)
            {
              this.setState({
                message: "You have found Aqua Vitae!"
              }); 
            }
          else
            {
              this.setState({
                  message: "You have found Oil of Vitriol!"
                });
            }
            
        }
    }
  else if(dungeonLevelToRender[n] === 'gold')  //mrBlue encounters a Mystery Chest that hides Iron (OR that hides Salt of Alembroth)
    { 
      this.updateDungeonMap5(n); 
      
      // if mrBlueCondition === 1 (mrBlue is carrying vitriol)
      if(this.state.mrBlueCondition === 1)
        {
          if(this.state.currentLevel === 2)
            {
              this.setState({
                    message: "You have found Salt of Alembroth but first you must deposit the Blue Stone you carry into the Alembic!"
                });
            }
          else if(this.state.currentLevel === 3)
            {
              this.setState({
                    message: "You have found Lactusa Virosa but first you must deposit the Aqua Vitae you carry into the Athanor!"
                });
            }
          else
            {
              this.setState({
                    message: "You have found Iron but first you must deposit the vitriol you carry into the Coagulator!"
                });
            }
           
        }
      // else
      else
      {
        if(this.state.currentLevel === 2)
          {
            this.setState({
                message: "You have found Salt of Alembroth!"
              });
          }
        else if(this.state.currentLevel === 3)
          {
            this.setState({
                message: "You have found Lactusa Virosa!"
              });
          }
        else
          {
              this.setState({
                message: "You have found Iron!"
              });
          }
        
        
        this.setState({
              mrBlueCondition: 2
          });
      }
    }
  else if(dungeonLevelToRender[n] === 'coral')  //mrBlue encounters Iron that has already been uncovered (OR encounters Salt of Alembroth that is uncovered)
                                                //mrBlue is either empty handed (has deposited the acid) or carrying the acid
    { 
      this.updateDungeonMap(); 
      
      if(this.state.mrBlueCondition === 1) // if mrBlue is carrying vitriol (or Blue Stone), you don't want anything to happen to the iron/coral
        {
          if(this.state.currentLevel === 2)
            {
              this.setState({
                  message: "You have found Salt of Alembroth but first you must deposit the Blue Stone you carry into the Alembic!"
                });
            }
          else if(this.state.currentLevel === 3)
            {
              this.setState({
                  message: "You have found Lactusa Virosa but first you must deposit the Aqua Vitae you carry into the Athanor!"
                });
            }
          else
            {
              this.setState({
                  message: "You have found Iron but first you must deposit the vitriol you carry into the Coagulator!"
                });
            }
           
        }
      // else
      else // mrBlue is empty handed - you want mrBlue to pick up the iron and for the iron to disappear
      {
        if(this.state.currentLevel === 2)
          {
            this.setState({
              message: "You have found Salt of Alembroth!"
              });
          }
        else if(this.state.currentLevel === 3)
          {
            this.setState({
              message: "You have found Lactusa Virosa!"
              });
          }
        else
          {
            this.setState({
              message: "You have found Iron!"
            });
          }
        
        
        this.setState({
              mrBlueCondition: 2
          });
      }
    }
  
  else if(dungeonLevelToRender[n] === 'aqua')  //mrBlue encounters vitriol (or Blue Stone) that has already been uncovered 
                                                //mrBlue is either empty handed (has deposited the acid) or carrying the iron
    { 
      this.updateDungeonMap(); 
      
      if(this.state.mrBlueCondition === 2) // if mrBlue is carrying iron (or is carrying Salt of Alembroth), you don't want anything to happen to the iron/coral (or Salt of ALembroth)
        {
          if(this.state.currentLevel === 2)
            {
               this.setState({
                  message: "You have found Blue Stone, but first you must deposit the Salt of Alembroth you carry into the Alembic!"
                });
            }
          else if(this.state.currentLevel === 3)
            {
               this.setState({
                  message: "You have found Aqua Vitae, but first you must deposit the Lactusa Virosa you carry into the Athanor!"
                });
            }
          else
            {
              this.setState({
                message: "You have found the Oil of Vitriol, but first you must deposit the Iron you carry into the Coagulator!"
              });
            }
           
        }
      // else
      else // mrBlue is empty handed - you want mrBlue to pick up the iron (or Salt of Alembroth) and for the iron (or Salt of Alembroth) to disappear
      {
        if(this.state.currentLevel === 2)
          {
            this.setState({
              message: "You have found Blue Stone!"
          });
          }
        else if(this.state.currentLevel === 3)
          {
            this.setState({
              message: "You have found Aqua Vitae!"
          });
          }
        this.setState({
              message: "You have found the Oil of Vitriol!"
          });
        
        this.setState({
              mrBlueCondition: 1
          });
      }
    }
  
    else{

      
      this.setState({
          masterArray: masterArray
        });
    }
	//console.log("moveMrBlue has completed.");
       }, // END OF moveMrBlue
  
  runRunRUN: function(){ // stepping on a worm changes iteration to 0. subsequent moves iterates it to 3. at 3, all worms in play (red worms) move
    if(this.state.wormPursuit !=0){
     if(this.state.wormPursuitIteration < 2) 
       {
        this.setState({
            wormPursuitIteration: this.state.wormPursuitIteration + 1
          });
       }
      else if(this.state.wormPursuitIteration === 2) 
       {
        this.updateZplusArray();
        this.setState({
            wormPursuitIteration: this.state.wormPursuitIteration + 1
          });
       }
      else{
        this.setState({
            wormPursuitIteration: 0
          });
          }
    }
	//console.log("renRunRUN has completed.");
  },
  
   updatePosition: function(x) {
    var tempArrforMrBlue2 = [];
        var dungeonLevelToRender2 = this.state.currentDungeonLevel;
         var mrBluesPresentPosition = this.state.mrBluesPosition;
    var mrBluePosition = x;
         var gridtotal7 = this.state.totalColumns * this.state.totalRows;
          for (var p = 0; p < gridtotal7; p++) {
            if(p === mrBluePosition)
              {
                if(this.state.GameOver === 1)
                {
                  tempArrforMrBlue2.push('red');
                }
                else
                {
                  tempArrforMrBlue2.push('blue');
                }
              }
              
            else if(p === mrBluePosition+143 || p === mrBluePosition+145 || p === mrBluePosition+144 || p === mrBluePosition-143 || p === mrBluePosition-145 || p === mrBluePosition-144 || p === mrBluePosition-48 || p === mrBluePosition-49 || p === mrBluePosition-50 || p === mrBluePosition-47 || p === mrBluePosition-46 || p === mrBluePosition-45 || p === mrBluePosition-51 ||
                    p === mrBluePosition+45 || p === mrBluePosition+48 || p === mrBluePosition+47 || p === mrBluePosition+46 || p === mrBluePosition+49 || p === mrBluePosition+50  || p === mrBluePosition+51  ||
                    p === mrBluePosition-96 || p === mrBluePosition-97 || p === mrBluePosition-98 || p === mrBluePosition-95 || p === mrBluePosition-94 || p === mrBluePosition+96 || p === mrBluePosition+95 || p === mrBluePosition+94 || p === mrBluePosition+97 || p === mrBluePosition+98  ||
                    p === mrBluePosition+1 || p === mrBluePosition-1 || p === mrBluePosition+2 || p === mrBluePosition-2 || p === mrBluePosition-3 || p === mrBluePosition+3 )
              {tempArrforMrBlue2.push(dungeonLevelToRender2[p])}
            else{tempArrforMrBlue2.push('black')}
            //else{tempArrforMrBlue2.push(dungeonLevelToRender2[p])}
            }
    this.setState({
          mrBluesPosition: mrBluePosition
        });
      this.setState({
          masterArray: tempArrforMrBlue2
        });
    // this.setState({
   //           message: x
   //       });
	//console.log("updatePosition has completed.");
  }, //END OF updatePosition  
  
updateDungeonMap: function(h)  // what gets passed is mrBlue's NEW position
{ 
 var tempArrToUpdateMap = [];
  if(this.state.wormPursuit === 0)
	{
        	  var dungeonLevelToRender = this.state.currentDungeonLevel;
    	    var gridtotal9 = this.state.totalColumns * this.state.totalRows;
          	for (var z = 0; z < gridtotal9; z++) 
	        {
            	if(z === h)
              	{
	            if(dungeonLevelToRender[z] === 'pink')
              	                 {
	                            tempArrToUpdateMap.push('pink');
	                              }      
                                  else{
	                            tempArrToUpdateMap.push('grey');
	                               }
	            } 
                else if(dungeonLevelToRender[z] === 'blue')
              	{
	            tempArrToUpdateMap.push('grey');
	            }
                else if(dungeonLevelToRender[z] === 'brown')
              	{
	            tempArrToUpdateMap.push('grey');
	            } 
                else if(dungeonLevelToRender[z] === 'beige')
              	{
	            tempArrToUpdateMap.push('grey');
	            } 
              else if(dungeonLevelToRender[z] === 'cyan')
              	{
	            tempArrToUpdateMap.push('grey');
	            } 
                else if(dungeonLevelToRender[z] === 'aqua')
              	{
                      if(this.state.mrBlueCondition === 1)
                        {
                          tempArrToUpdateMap.push('grey');
                        } 
                      else
                        {
                          tempArrToUpdateMap.push('aqua');
                        }
	            } 
              else if(dungeonLevelToRender[z] === 'coral')
              	{
                      if(this.state.mrBlueCondition === 2)
                        {
                          tempArrToUpdateMap.push('grey');
                        } 
                      else
                        {
                          tempArrToUpdateMap.push('coral');
                        }
	            }
            	else
	        {
	        tempArrToUpdateMap.push(dungeonLevelToRender[z])
	        }
            }
    	}
  else
    {
      var dungeonLevelToSearch = this.state.masterArray;   
      if(this.state.wormPursuitIteration === 3)   
         {
           var dungeonLevelToRender = this.state.currentDungeonLevel;
    	    var gridtotal9 = this.state.totalColumns * this.state.totalRows;        	
        this.setState({
        lastZmessage0: this.state.isZplus
        });
          	    for (var z = 0; z < gridtotal9; z++)  //when MrBlue moves to purple, add to the zPlus array with addZplus
                 //this.checkZplus(z);                                     
                                                      // when runRunRUN runs, if iteration is 2, run updateZplusArray
	                              {
                                       if(dungeonLevelToRender[z] === 'red')                      
              	                     {
                                           if(this.state.assumeZmoves === 0)
                                             {tempArrToUpdateMap.push('red')}//in case the worm cannot move!
                                            else
                                            {
	                                    tempArrToUpdateMap.push('grey')
                                            }
                                          }
                                      else if(dungeonLevelToSearch[z] === 'brown')
              	                  {
	                              tempArrToUpdateMap.push('grey');
	                              }      
                                      else if(dungeonLevelToRender[z] === 'cyan')
              	                  {
	                              tempArrToUpdateMap.push('grey');
	                              } 
                                       else if (z===this.state.zPlusArray[0])
	                                                   {
	                                                  tempArrToUpdateMap.push('red')
	                                                    }
                                       else if (z===this.state.zPlusArray[1])
	                                                   {
	                                                  tempArrToUpdateMap.push('red')
	                                                    }
                                       else if (z===this.state.zPlusArray[2])
	                                                    {
	                                                  tempArrToUpdateMap.push('red')
	                                                     }
                                       else if (z===this.state.zPlusArray[3])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                     }
                                       else if (z===this.state.zPlusArray[4])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    }
                                       else if (z===this.state.zPlusArray[5])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    }   
                                else if (z===this.state.zPlusArray[6])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[7])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[8])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[9])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[10])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    }   
                                else if (z===this.state.zPlusArray[11])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[12])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[13])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[14])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[15])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    }   
                                else if (z===this.state.zPlusArray[16])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[17])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[18])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[19])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[20])
	                                                    {
                                                              tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[21])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[22])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[23])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[24])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    }   
                                else if (z===this.state.zPlusArray[25])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[26])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[27])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[28])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[29])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    }   
                                else if (z===this.state.zPlusArray[30])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[31])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                else if (z===this.state.zPlusArray[32])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[33])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[34])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[35])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[36])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[37])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[38])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[39])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[40])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[41])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[42])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[43])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[44])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    else if (z===this.state.zPlusArray[45])
	                                                    {
	                                                   tempArrToUpdateMap.push('red')
	                                                    } 
                                    
                                    else if(dungeonLevelToRender[z] === 'aqua')
              	{
                      if(this.state.mrBlueCondition === 1)
                        {
                          tempArrToUpdateMap.push('grey');
                        } 
                      else
                        {
                          tempArrToUpdateMap.push('aqua');
                        }
	            } 
              else if(dungeonLevelToRender[z] === 'coral')
              	{
                      if(this.state.mrBlueCondition === 2)
                        {
                          tempArrToUpdateMap.push('grey');
                        } 
                      else
                        {
                          tempArrToUpdateMap.push('coral');
                        }
	            }
                                    
                                    
                                else if(z === h)    
                                {
                                  if(dungeonLevelToSearch[z] === 'pink')
              	                 {
	                            tempArrToUpdateMap.push('pink');
	                              }      
                                  else{
	                            tempArrToUpdateMap.push('grey');
	                               }
                                 }
            	                 else
	                                {
	                                tempArrToUpdateMap.push(dungeonLevelToRender[z])
	                                }    
                                  }         
         }
      else
        {                               
          var dungeonLevelToRender = this.state.currentDungeonLevel;
          var gridtotal9 = this.state.totalColumns * this.state.totalRows;
          	for (var z = 0; z < gridtotal9; z++) 
	        {  
                                        if(z === h)                      
              	                        {
                                              if(dungeonLevelToSearch[z] === 'pink')
              	                            {
	                                        tempArrToUpdateMap.push('pink');
	                                        }      
                                              else{
	                                        tempArrToUpdateMap.push('grey');
	                                          }
                                            }
                                        else if(dungeonLevelToRender[z] === 'brown')
              	                  {
	                              tempArrToUpdateMap.push('grey');
	                              }
                                      else if(dungeonLevelToRender[z] === 'beige')
              	                  {
	                              tempArrToUpdateMap.push('grey');
	                              }
                                      else if(dungeonLevelToRender[z] === 'cyan')
              	                  {
	                            tempArrToUpdateMap.push('grey');
	                               } 
                   else if(dungeonLevelToRender[z] === 'aqua')
              	{
                      if(this.state.mrBlueCondition === 1)
                        {
                          tempArrToUpdateMap.push('grey');
                        } 
                      else
                        {
                          tempArrToUpdateMap.push('aqua');
                        }
	            } 
              else if(dungeonLevelToRender[z] === 'coral')
              	{
                      if(this.state.mrBlueCondition === 2)
                        {
                          tempArrToUpdateMap.push('grey');
                        } 
                      else
                        {
                          tempArrToUpdateMap.push('coral');
                        }
	            }
            	                        else
	                                {
	                                tempArrToUpdateMap.push(dungeonLevelToRender[z])
	                                }
            }
        }
    }    
  this.setState({
          	currentDungeonLevel: tempArrToUpdateMap
        	});
//console.log("updateDungeonMap has completed.");
},//END OF updateDungeonMap
  
  updateDungeonMap2: function(h){ // mrBlue has encountered a purple (a Mystery Chest that hides a Worm)
    var tempArrToUpdateMap = [];
        var dungeonLevelToRender = this.state.currentDungeonLevel;
    var gridtotal9 = this.state.totalColumns * this.state.totalRows;
          for (var z = 0; z < gridtotal9; z++) {
            if(z === h)
              {tempArrToUpdateMap.push('red');}         // Change a purple (a Mystery Chest that hides a Worm) to a red (a Worm)
            else if(z===this.state.mrBluesPosition)     // otherwise, mrBlue would temporarily disappear
              if(this.state.GameOver === 1)
                {
                  {tempArrToUpdateMap.push('grey');}
                }
            else
              {
                {tempArrToUpdateMap.push('brown');}
              }
                      
            else{tempArrToUpdateMap.push(dungeonLevelToRender[z])}
            }
    
       this.setState({
         currentDungeonLevel: tempArrToUpdateMap
        });
    
    var stayput = this.state.mrBluesPosition;
    
    this.updatePosition(stayput);
    
//    this.setState({                                    
//          masterArray: this.state.currentDungeonLevel  
//        });      
    

    
	//console.log("updateDungeonMap2 has completed.");                                      
  }, 

  updateDungeonMap3: function(h){ // mrBlue has encountered a green ( a Mystery Chest that hides a Coagulator) 
    var tempArrToUpdateMap = [];
        var dungeonLevelToRender = this.state.currentDungeonLevel;
    var gridtotal9 = this.state.totalColumns * this.state.totalRows;
          for (var z = 0; z < gridtotal9; z++) {
            if(z === h)
              {tempArrToUpdateMap.push('pink');}  // changes green (Mystery Chest hiding the Coagulator) to pink ( the Coagulator)
            else if(z===this.state.mrBluesPosition)     
           //   if(this.state.mrBlueCondition === 1)
           //     {
           //       {tempArrToUpdateMap.push('brown');}
           //     }
              {tempArrToUpdateMap.push('brown');} // mrBlue himself
            else{tempArrToUpdateMap.push(dungeonLevelToRender[z])}
            }
        this.setState({
          currentDungeonLevel: tempArrToUpdateMap
        });
    
    var stayput = this.state.mrBluesPosition;
    
    this.updatePosition(stayput);
  }, 
  
  
    updateDungeonMap4: function(h){ // makes mystery box turn into Sulfuric Acid
    var tempArrToUpdateMap = [];
        var dungeonLevelToRender = this.state.currentDungeonLevel;
    var gridtotal9 = this.state.totalColumns * this.state.totalRows;
       if(this.state.mrBlueCondition === 2) // if mrBlue is carrying Iron  
        {
          for (var z = 0; z < gridtotal9; z++) {
            if(z === h)
              {tempArrToUpdateMap.push('aqua');} 
            else if(z===this.state.mrBluesPosition)     
              {tempArrToUpdateMap.push('cyan');} 
            else{tempArrToUpdateMap.push(dungeonLevelToRender[z])}
            }
        }
       else // mrBlue is not carrying iron
         {
           for (var z = 0; z < gridtotal9; z++) {
            if(z === h)
              {tempArrToUpdateMap.push('aqua');} 
            else if(z===this.state.mrBluesPosition)     
              {tempArrToUpdateMap.push('beige');} 
            else{tempArrToUpdateMap.push(dungeonLevelToRender[z])}
            }
           this.setState({
                    mrBlueCondition: 1
                 });
         }
        
        this.setState({
          currentDungeonLevel: tempArrToUpdateMap
        });
    
      var stayput = this.state.mrBluesPosition;
    
    this.updatePosition(stayput);
  }, 
  
  updateDungeonMap5: function(h){ // makes mystery box turn into iron
    var tempArrToUpdateMap = [];
        var dungeonLevelToRender = this.state.currentDungeonLevel;
    var gridtotal9 = this.state.totalColumns * this.state.totalRows;
          for (var z = 0; z < gridtotal9; z++) {
            if(z === h)
              {tempArrToUpdateMap.push('coral');} // changes gold (a Mystery Chest that hides Iron)  to coral (Iron)
            else if(z===this.state.mrBluesPosition)     
              {tempArrToUpdateMap.push('cyan');} // makes MrBlue appear to be holding Iron
            else{tempArrToUpdateMap.push(dungeonLevelToRender[z])}
            }
        this.setState({
          currentDungeonLevel: tempArrToUpdateMap
        });
    
    var stayput = this.state.mrBluesPosition;
    
    this.updatePosition(stayput);
  }, 
  
  updateDungeonMapTONEXTLEVEL: function(h){ // h is mrBlue's new random position that should keep him clear of any walls!
    var tempArrToUpdateMap = [];
    
    this.setState({
          mrBluesPosition: h
        });
    
        var dungeonLevelToRender = this.state.currentDungeonLevel;
    var gridtotal9 = this.state.totalColumns * this.state.totalRows;
          for (var z = 0; z < gridtotal9; z++) {
            if(z === h)
              {tempArrToUpdateMap.push('blue');} 
            else{tempArrToUpdateMap.push(dungeonLevelToRender[z])}
            }
    
    var nextLevel = this.state.currentLevel + 1
    
    this.setState({
      currentLevel: nextLevel
    })
    
    this.setState({
	zPlus: 0
});

this.setState({
          zPlusArray: []
});

this.setState({
          isZplus:0
});

this.setState({
          wormPursuit: 0
});

this.setState({
          numberOfRedWorms: 0
});

this.setState({
          wormPursuitIteration: 0
});
    
        this.setState({
          currentDungeonLevel: tempArrToUpdateMap
        });
    
    var stayput = this.state.mrBluesPosition;
    
    this.updatePosition(stayput);
    
	console.log("updateDungeonMapTONEXTLEVEL has completed.");                                      
  },
  
  
  getZplus: function(o) 
  {
    this.setState({
          assumeZmoves: 1
        });
    var dungeonLevelToCheckMove = this.state.currentDungeonLevel; 
   var direction = 0;
    if (o - this.state.mrBluesPosition >0)
      {        
        if (o - this.state.mrBluesPosition <40)
        {
          var testValue = o-1;
          if(dungeonLevelToCheckMove[testValue] === 'grey')
          {direction = o-1;} 
          else{
              var testValue = o-49;
              if(dungeonLevelToCheckMove[testValue] === 'grey')
              {direction = o-49;} 
              else{
                var testValue = o+49;
              if(dungeonLevelToCheckMove[testValue] === 'grey')
              {direction = o+49;} 
              else{
                direction = o; 
                    this.setState({
                      assumeZmoves: 0
                    });
              }
              }
              }
        }
        else{
          var testValue = o-48;
          if(dungeonLevelToCheckMove[testValue] === 'grey')
          {direction = o-48;} 
          else{
            var testValue = o-47;
            if(dungeonLevelToCheckMove[testValue] === 'grey')
            {direction = o-47;} 
            else{
                var testValue = o-49;
              if(dungeonLevelToCheckMove[testValue] === 'grey')
              {direction = o-49;} 
              else{
                direction = o; 
                    this.setState({
                      assumeZmoves: 0
                    });
              }
            }
          }
        } 
      }
    else
      {
        if (this.state.mrBluesPosition - o <40){
          var testValue = o+1;
          if(dungeonLevelToCheckMove[testValue] === 'grey')
          {direction = o+1;} 
          else{
                var testValue = o-47;
              if(dungeonLevelToCheckMove[testValue] === 'grey')
              {direction = o-47;} 
              else{
                var testValue = o+47;
              if(dungeonLevelToCheckMove[testValue] === 'grey')
              {direction = o+47;} 
              else{
                direction = o;
                    this.setState({
                      assumeZmoves: 0
                    });
              }
              }
              }
        } 
        else{
          var testValue = o+48;
          if(dungeonLevelToCheckMove[testValue] === 'grey')
          {direction = o+48;} 
          else{
                      var testValue = o+47;
                      if(dungeonLevelToCheckMove[testValue] === 'grey')
                      {direction = o+47;} 
                      else{
                        var testValue = o+49;
                        if(dungeonLevelToCheckMove[testValue] === 'grey')
                        {direction = o+49;} 
                        else{
                            direction = o; 
                                this.setState({
                                assumeZmoves: 0
                                });
                        }
                      }
          }
          } 
      }  
    this.setState({
          zPlus: direction
        });
	//console.log("getZplus has completed.");
  },
          
 addZplus: function(o){ // when MrBlue moves to a purple, get that current position and add it to the zPlus array for tracking
   //console.log("addZplus has fired");
   var ZplusArrayToUpdate = this.state.zPlusArray;
     ZplusArrayToUpdate.push(o); 
 this.setState({
   zPlusArray0: ZplusArrayToUpdate[0]
 }); 
     this.setState({
          zPlusArray: ZplusArrayToUpdate
        }); 
   var newmessage = this.state.zPlusArray[this.state.zPlusArray.length-1]
   this.setState({
          lastZmessage0: newmessage
        }); 
	//console.log("addZplus has completed.");
 },
  
  updateZplusArray: function(){
    var ZplusArrayToUpdate = this.state.zPlusArray;
     for(var x=0; x<ZplusArrayToUpdate.length; x++) 
       {
         var currentItem = ZplusArrayToUpdate[x];
         //console.log("what is getting sent to getZplus is " + currentItem)
         this.getZplus(currentItem);
         ZplusArrayToUpdate[x] = this.state.zPlus;
       } 
     this.setState({
          zPlusArray: ZplusArrayToUpdate
        }); 
	//console.log("updateZplus has completed.");
  },
  
  checkZplus: function(g){  
    var ZplusArrayToCheck = this.state.zPlusArray;
    for(var f = 0; f < ZplusArrayToCheck.length; f++)
      {
       if(g === ZplusArrayToCheck[f])
         {
           this.setState({
          isZplus: 1
          });
         }
        else
         {
           this.setState({
          isZplus: 0
          });
         }
      }
	//console.log("checkZplus has completed.");
  },
  
  playerMove: function(event) { 
        switch(event.keyCode) {      
      case 37: 
        var a = this.state.mrBluesPosition;
        var L = a-1;
        this.moveMrBlue(L);
        break;
      case 38:
        var b = this.state.mrBluesPosition;
        var U = b-48;
        this.moveMrBlue(U);
        break;
      case 39:
        var c = this.state.mrBluesPosition;
        var R = c+1;
        this.moveMrBlue(R);
        break;
      case 40:
        var e = this.state.mrBluesPosition;
        var D = e+48;
        this.moveMrBlue(D);
        break;
     //console.log("playerMove has completed.");                   
                            }
      },
  
   getRandomStartingPosition: function(m) {
        var youAreStuckInAWall = 'true';  // assume you are stuck in a wall
        while(youAreStuckInAWall === 'true'){
          var testRandomStartingPosition = Math.floor(Math.random() * (1676));  // grab a random number
          var checkRandomStartingPosition = m[testRandomStartingPosition] // get the coordinates for all the surrounding squares
          var checkRandomStartingPositionUp = m[testRandomStartingPosition - 48]
          var checkRandomStartingPositionUpRight = m[testRandomStartingPosition - 47]
          var checkRandomStartingPositionDown = m[testRandomStartingPosition + 48]
          var checkRandomStartingPositionDownLeft = m[testRandomStartingPosition + 47]
          var checkRandomStartingPositionLeft = m[testRandomStartingPosition - 1]
          var checkRandomStartingPositionRight = m[testRandomStartingPosition + 1]
          if(checkRandomStartingPosition != 'light grey' && checkRandomStartingPositionUp != 'light grey'  && checkRandomStartingPositionUpRight != 'light grey' && checkRandomStartingPositionDown != 'light grey' && checkRandomStartingPositionDownLeft != 'light grey' && checkRandomStartingPositionRight != 'light grey' && checkRandomStartingPositionLeft != 'light grey')
            //if(checkRandomStartingPosition != 'light grey')
          {
              youAreStuckInAWall = 'false';
          }
          else{
            youAreStuckInAWall = 'true'; 
          }
      }
         return(testRandomStartingPosition);
      },
  
  getRandomStartingPositionForMrBlue: function() {
        var youAreStuckInAWall = 'true';
        while(youAreStuckInAWall === 'true'){
          var testRandomStartingPosition = Math.floor(Math.random() * (1676));
          var checkRandomStartingPosition = this.state.currentDungeonLevel[testRandomStartingPosition]
          var checkRandomStartingPositionUp = this.state.currentDungeonLevel[testRandomStartingPosition - 48]
          var checkRandomStartingPositionUpRight = this.state.currentDungeonLevel[testRandomStartingPosition - 47]
          var checkRandomStartingPositionDown = this.state.currentDungeonLevel[testRandomStartingPosition + 48]
          var checkRandomStartingPositionDownLeft = this.state.currentDungeonLevel[testRandomStartingPosition + 47]
          var checkRandomStartingPositionLeft = this.state.currentDungeonLevel[testRandomStartingPosition - 1]
          var checkRandomStartingPositionRight = this.state.currentDungeonLevel[testRandomStartingPosition + 1]
          if(checkRandomStartingPosition != 'light grey' && checkRandomStartingPositionUp != 'light grey'  && checkRandomStartingPositionUpRight != 'light grey' && checkRandomStartingPositionDown != 'light grey' && checkRandomStartingPositionDownLeft != 'light grey' && checkRandomStartingPositionRight != 'light grey' && checkRandomStartingPositionLeft != 'light grey')
            //if(checkRandomStartingPosition != 'light grey')
          {
              youAreStuckInAWall = 'false';
          }
          else{
            youAreStuckInAWall = 'true'; 
          }
      }
         return(testRandomStartingPosition);
      },

   generateRandomLevel: function() {  // to change the look and feel of the maze, this is the function to update
     //console.log("generateRandomLevel has started.");
         var tempArr = [],
         gridtotal = this.state.totalColumns * this.state.totalRows;
          for (var r = 0; r < gridtotal; r++) {
            tempArr.push(Math.floor((Math.random() * 2)) ? 'light grey' : 'grey');
          }
     //console.log("generateRandomLevel has completed.");
        return(tempArr)
       },
 
   render: function() {
      var tempgrid = [],
         tempgridtotal2 = this.state.totalColumns * this.state.totalRows;
          for (var x = 0; x < tempgridtotal2; x++) {
            if(this.state.masterArray[x] === "blue"){
              if(this.state.mrBlueCondition === 1) 
                {
                  if(this.state.currentLevel === 2)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox18 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox24 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox11 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithSulfuricAcid
                    }
                  
                }
              else if(this.state.mrBlueCondition === 2) 
                {
                  if(this.state.currentLevel === 2)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox19 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithAlembroth
                    }
                  else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox25 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox13 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithIron
                    }
                  
                }
              else
                {
                  var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox2 divkey={x} Name={x} usethis={picture}/>);  // mrBlue
                } 
            }
            else if(this.state.masterArray[x] === "brown"){
              if(this.state.mrBlueCondition === 1)
                {
                  if(this.state.currentLevel === 2)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox18 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox24 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox11 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithSulfuricAcid
                    }
                }
              else if(this.state.mrBlueCondition === 2) 
                {
                  if(this.state.currentLevel === 2)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox19 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithAlembroth
                    }
                  else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox25 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox13 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithIron
                    }
                }
              else
                {
                  var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox7 divkey={x} Name={x} usethis={picture}/>);
                } 
            }
            else if(this.state.masterArray[x] === "grey"){
              var picture = localStorage.getItem('bannerImage');
            tempgrid.push(<ActionBox3 divkey={x} Name={x} usethis={picture}/>);    
            } 
            else if(this.state.masterArray[x] === "light grey"){
            tempgrid.push(<ActionBox6 divkey={x} Name={x} />);    
            }
            else if(this.state.masterArray[x] === "green"){
              tempgrid.push(<ActionBox4 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);  
            }
            else if(this.state.masterArray[x] === "gold"){
              tempgrid.push(<ActionBox4 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);  
            }
            else if(this.state.masterArray[x] === "red"){
              if(this.state.currentLevel === 2)
                {
                  tempgrid.push(<ActionBox14 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />); 
                }
              else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox20 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
              else
                {
                  tempgrid.push(<ActionBox5 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);
                } 
            } 
            else if(this.state.masterArray[x] === "purple"){
              tempgrid.push(<ActionBox4 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);
            }
	          else if(this.state.masterArray[x] === "pink"){
              if(this.state.currentLevel === 2)
                {
                  var picture = localStorage.getItem('bannerImage');
            tempgrid.push(<ActionBox15 divkey={x} Name={x} usethis={picture}/>);
                }
              else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox21 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
              else
                {
                  var picture = localStorage.getItem('bannerImage');
            tempgrid.push(<ActionBox8 divkey={x} Name={x} usethis={picture}/>);
                }
                
            }
            else if(this.state.masterArray[x] === "aqua"){
              if(this.state.currentLevel === 2)
                {
                  var picture = localStorage.getItem('bannerImage');
            tempgrid.push(<ActionBox17 divkey={x} Name={x} usethis={picture}/>); 
                }
              else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox23 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
              else
                {
                  var picture = localStorage.getItem('bannerImage');
            tempgrid.push(<ActionBox9 divkey={x} Name={x} usethis={picture}/>);
                }
                
            }
            else if(this.state.masterArray[x] === "beige"){
              if(this.state.currentLevel === 2)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox18 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
              else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox24 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox11 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithSulfuricAcid
                    }
            }
            else if(this.state.masterArray[x] === "azure"){
              tempgrid.push(<ActionBox10 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);  
            }
            else if(this.state.masterArray[x] === "coral"){  //iron or Salt of Alembroth
              if(this.state.currentLevel === 2)
                {
                  tempgrid.push(<ActionBox16 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);
                }
              else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox22 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
              else
                {
                  tempgrid.push(<ActionBox12 divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);
                }
                
            }
            else if(this.state.masterArray[x] === "cyan"){  //iron
              if(this.state.currentLevel === 2)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox19 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithAlembroth
                    }
              else if(this.state.currentLevel === 3)
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox25 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithBlueStone
                    }
                  else
                    {
                      var picture = localStorage.getItem('bannerImage');
                  tempgrid.push(<ActionBox13 divkey={x} Name={x} usethis={picture}/>);  // mrBlueWithIron
                    } 
            }
            else{
              tempgrid.push(<ActionBox divkey={x} Name={x} divcolor={this.state.masterArray[x]} />);
                }
          }
      return ( 
        <div >       
            <div id="talkerDiv">
              <div id="systemMessages">
                <h4>{this.state.levelMessage}</h4>
                <h4>{this.state.message}</h4>
                <h5>{this.state.testPosition}</h5>
          </div>   
            </div>
            <div id="applicationGrid" >
             {tempgrid} 
            </div>
          </div>
      );   
   //  console.log("The main render function has completed.");
     } // end of render function
	
    }); //end of Buttons and Grid



var ActionBox = React.createClass({ // pushes the darkness
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
                <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
            </div>
          );  
        },
    });

var ActionBox2 = React.createClass({ // this renders the player's character (currently a url)
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {     
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://3.bp.blogspot.com/-lStChWVOUx0/WNT4VPqLBYI/AAAAAAAAL_I/IQdsZilV7_M5rA8XhKjrGHzyhNZoSG20wCLcB/s1600/sprite1.gif" alt="Main Character" id="MainCharacter" width="20" height="20" />        
            </div>
          );
          
        },
    });

var ActionBox3 = React.createClass({ // this renders the floor tiles
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://3.bp.blogspot.com/-Y9kZVF0ElwI/WNT6Zy7d_2I/AAAAAAAAL_U/kHfKMra1zdM2x1NYJNOamUHLmin6IDqmwCLcB/s320/floor1.png" alt="Floor" id="Floor" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox4 = React.createClass({ // pushes the Mystery Chest
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://3.bp.blogspot.com/-iI0S33FrtkM/WNUtL7a79BI/AAAAAAAAMAA/oLdt6XGlKwoQk2XkctlUT2AImd0tJedlwCLcB/s1600/MysteryChest2.png" alt="Floor" id="Floor" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox5 = React.createClass({ // Pushes the Worm
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://4.bp.blogspot.com/-xWQUeu9OPWI/WNUp-MbZhqI/AAAAAAAAL_o/I6fXvE8ofWoggkENp7ZgHGfJ3ON6Krd4wCLcB/s1600/Worm1.png" alt="Floor" id="Floor" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox6 = React.createClass({ // Pushes the Worm
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}   > 
                <img src="https://1.bp.blogspot.com/-VfjoDQalm-E/WOz9VdQQN9I/AAAAAAAAMK0/KhfSLu5whI8JoktJo8T_qh_SIKcM7rkKQCLcB/s1600/arcanumWalls.png" alt="Lava" id="lava" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox7 = React.createClass({ // this renders the player's character (currently a url)
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://3.bp.blogspot.com/-lStChWVOUx0/WNT4VPqLBYI/AAAAAAAAL_I/IQdsZilV7_M5rA8XhKjrGHzyhNZoSG20wCLcB/s1600/sprite1.gif" alt="Main Character" id="MainCharacter" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox8 = React.createClass({ // this renders the player's character (currently a url)
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://1.bp.blogspot.com/-ExkkqXk1Jmg/WO9nK0YsUNI/AAAAAAAAMLk/U_di_xTz8TcBgYARrmgRDmDjtT0y1arCgCLcB/s1600/coagulation.png" alt="coagulation" id="coagulation" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox9 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://1.bp.blogspot.com/-cDOiDv6bInw/WO985-DlXrI/AAAAAAAAML0/yNjRfRTgThc2G_8PeatJFJSLygSaGupbQCLcB/s1600/SulfuricAcid.gif" alt="oilOfVitriol" id="oilOfVitriol" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox10 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://3.bp.blogspot.com/-iI0S33FrtkM/WNUtL7a79BI/AAAAAAAAMAA/oLdt6XGlKwoQk2XkctlUT2AImd0tJedlwCLcB/s1600/MysteryChest2.png" alt="Floor" id="Floor" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox11 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://4.bp.blogspot.com/-Xx2QOrM3pp0/WO9-PM9hjAI/AAAAAAAAMMA/tSuop78_TDEkMb8FXPfcEBEbb9LN1vy-QCLcB/s1600/MrBwithSulfAcid.png" alt="Floor" id="Floor" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox12 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://3.bp.blogspot.com/-B-VCQe5vOPQ/WPEiZpPL7RI/AAAAAAAAMMU/Q7iud9qUIsgdtBfSGVVGy0wvi5bmJwKOgCLcB/s1600/iron.gif" alt="Iron" id="Iron" width="20" height="20" />
            </div>
          );
        }, 
    });

var ActionBox13 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://3.bp.blogspot.com/-3uxo0gJHqek/WPEgj_T0jvI/AAAAAAAAMMQ/H8vtBC-7ZA0q5Hu6IP8Eis_4mhzUseYMACLcB/s1600/mrBluewithIron.gif" alt="MrBwithIron" id="MrBwithIron" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox14 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://1.bp.blogspot.com/-5ZpD6FjCWvk/WRCqBshksfI/AAAAAAAAMk8/i1iSmvg1dD4AY7Ntnw6CXnTaKaW6xOP1wCLcB/s1600/liberal.gif" alt="liberal" id="liberal" width="20" height="20" />
            </div>
          );
        },
    });


var ActionBox15 = React.createClass({ // this renders the player's character (currently a url)
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://4.bp.blogspot.com/-9cDpteodpEQ/WRC3P9RoN_I/AAAAAAAAMlg/5U-YHwG51z8Ax3dWOU4FmKT-jwfinaNZwCLcB/s1600/alembic.gif" alt="alembic" id="alembic" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox16 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://1.bp.blogspot.com/-afEKlNQXtBw/WRC3OpZZy3I/AAAAAAAAMlc/ySuA4egJv388T7qgNFnJHxD30HWzry6ugCLcB/s1600/saltAlembroth.gif" alt="saltAlembroth" id="saltAlembroth" width="20" height="20" />
            </div>
          );
        }, 
    });

var ActionBox17 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://4.bp.blogspot.com/-vE38moElIQY/WRC3FKvzMQI/AAAAAAAAMlY/yNqz9tDpBJMqEcFqD2K3TaTEEzcYtG9FwCLcB/s1600/blueStone.gif" alt="blueStone" id="blueStone" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox18 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://4.bp.blogspot.com/-us-43lgY2DI/WRR1vstCd3I/AAAAAAAAMmQ/Cbv3u4vf2UAb160TPIglIJTIuwOaj7wWwCLcB/s1600/mrBlueWithBlueStone.gif" alt="mrBluewithBlueStone" id="mrBluewithBlueStone" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox19 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://1.bp.blogspot.com/-3dPinViRWXI/WRR1uAD71nI/AAAAAAAAMmM/nasWLwxpaggCKs96EfhzBTmtQAJUdUt-gCLcB/s1600/mrBlueWithAlembroth.gif" alt="mrBlueWithAlembroth" id="mrBlueWithAlembroth" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox20 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://4.bp.blogspot.com/-R21xMVm5EKo/WRSzq7KsjOI/AAAAAAAAMmw/_cDorl15pEcECAwm0sKILOokRZUo7ZzwACLcB/s1600/spider.gif" alt="spider" id="spider" width="20" height="20" />
            </div>
          );
        },
    });


var ActionBox21 = React.createClass({ // this renders the player's character (currently a url)
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://1.bp.blogspot.com/-cBvLjX4Gnp0/WRXN-gZRxhI/AAAAAAAAMnI/lA7hSzfrIrky-DXpIKvTBiUS9h6Y_bWyACLcB/s1600/athanor.gif" alt="athanor" id="athanor" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox22 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://3.bp.blogspot.com/-p8Ghp0qTHyU/WRSyKYSDHMI/AAAAAAAAMmo/mu04VhuIh9UwJdDbs_sOS4hIpFkoOpKgwCLcB/s1600/lactucaVirosa.gif" alt="lactusa" id="lactusa" width="20" height="20" />
            </div>
          );
        }, 
    });

var ActionBox23 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.usethis
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey}>
                <img src="https://3.bp.blogspot.com/-Id5DmucHFfQ/WRSyJBVhkdI/AAAAAAAAMmk/KAqOpCMDK4UCTZrR-_0lKGtT3v_KP1vHwCLcB/s1600/aquaVitae.gif" alt="aq" id="aq" width="20" height="20" />
            </div>
          ); 
        },
    });

var ActionBox24 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://1.bp.blogspot.com/-2q41TCMwAU8/WRSyFv9Gh0I/AAAAAAAAMmg/5gOD7aNDO74rYMYkIm-7ng62HSbbVPstQCLcB/s1600/mrBluewithAquaVitae.gif" alt="mbwaq" id="mbwaq" width="20" height="20" />
            </div>
          );
        },
    });

var ActionBox25 = React.createClass({ 
  getInitialState: function() {
    return {
      backColor:this.props.divcolor
    }
  },
        render: function() {
            return(
            <div id="actionBox" index={this.props.divkey} style={{backgroundColor:this.props.divcolor}}  > 
                <img src="https://1.bp.blogspot.com/-5wLaz3DYsUw/WRSyLzWjWqI/AAAAAAAAMms/6rYjOIGUk5kcOIQ8xcWKy615df22nJM7ACLcB/s1600/mrBluewithLactuca.gif" alt="mrBlueWithLV" id="mrBlueWithLV" width="20" height="20" />
            </div>
          );
        },
    });

var MyApp = React.createClass({  
          getInitialState: function() {
                return {
                    seed: 'default'
                  }  
            },
          render: function() {  
            return(
              <div id="mainDiv" >
                    <div id="ARCANUM" >
                <img src="https://lh5.googleusercontent.com/FaKzig1Sx_EzXc_hubuity7RXK-i6nLwNCd0zA8oEFSSMzz0NadSjS2EyCX7QA7Ll6bC_wK4_SwLia18h8yZOGsibGjUXFxsECaslIXleoGe1SkS2o6c2huTca8vqHFJU8tTdlyy" alt="Main Character" id="MainCharacter" width="970" height="100" />
            </div>
              <ButtonsAndGrid /> <Footer />
              </div>
            );
           }, 
         });




var Footer = React.createClass({
         render() {
              return (
                  <footer>
                     <div id="containerfooter">
                      <p>Written by <a href="http://codepen.io/profaneVoodoo/full/dXBJzN/">John Gillespie</a>. Forsooth! A vile Worm!</p>
                     </div>
                  </footer>
                  );
                }
            });

ReactDOM.render(
  <MyApp />  ,
  document.getElementById('GoL')
);
