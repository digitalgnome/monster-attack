new Vue({
    el: '#app',
    data: {
        disableButton: false,
        showControls: false,
        monsterHealth: 100,
        currentMonsterHealth: 0,
        playerHealth: 100,
        currentPlayerHealth: 0,
        monsterDamage: 0,
        playerDamage: 0,
        monsterMessage: 'Monster hits player for ',
        playerMessage: 'Player hits monster for ',
        playerHealMessage: 'Player heals themself for ',
        healingValue: 10,
        gameRecord: []
    },
    methods: {
        startGame: function() {
            this.disableButton = false;
            this.showControls = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.monsterDamage = 0;
            this.playerDamage = 0;
            this.gameRecord = [];
        },
        heal: function() {
            if (this.playerHealth + this.healingValue <= 100) {
                this.monsterDamage = Math.floor(Math.random() * 10) + 1;
                this.playerHealth = this.playerHealth + this.healingValue;
                this.playerHealth = this.playerHealth - this.monsterDamage;
                this.gameRecord.unshift(this.monsterMessage + this.monsterDamage, this.playerHealMessage + this.healingValue);
            }
        },
        giveUp: function() {
            this.showControls = false;
        },
        winMessage: function() {
            this.disableButton = true;
            let vm = this;
            if (this.monsterHealth <= 0) {
                setTimeout(function() {
                    let alertOk = confirm('You won!  Play again?');
                    if (alertOk) {
                        vm.startGame();
                    }
                }, 100);
            }
        },
        loseMessage: function() {
            this.disableButton = true;
            let vm = this;
            if (this.playerHealth <= 0) {
                setTimeout(function() {
                    let alertOk = confirm('You lost!  Play again?');
                    if (alertOk) {
                        vm.startGame();
                    }
                }, 100);
            }
        },
        checkHealth: function() {
            if (this.monsterHealth <= 0) {
                this.disableButton = true;
                this.playerHealth = this.currentPlayerHealth;
                this.monsterHealth = 0;
                return this.winMessage();
            } else if (this.playerHealth <= 0) {
                this.disableButton = true;
                this.monsterHealth = this.currentMonsterHealth;
                this.playerHealth = 0;
                return this.loseMessage();
            }
        },
        attack: function() {
            this.currentMonsterHealth = this.monsterHealth;
            this.currentPlayerHealth = this.playerHealth;
            if (this.monsterHealth > 0 && this.playerHealth > 0) {
                this.monsterDamage = Math.floor(Math.random() * 20) + 1;
                this.playerDamage = Math.floor(Math.random() * 20) + 1;
                this.monsterHealth = this.monsterHealth - this.playerDamage;
                this.playerHealth = this.playerHealth - this.monsterDamage;
                this.checkHealth();               
                if (this.monsterHealth > 0 && this.playerHealth > 0) {
                    this.gameRecord.unshift(this.monsterMessage + this.monsterDamage, this.playerMessage + this.playerDamage);
                }
            }
        },
        specialAttack: function() {
            this.currentMonsterHealth = this.monsterHealth;
            this.currentPlayerHealth = this.playerHealth;
            if (this.monsterHealth > 0 && this.playerHealth > 0) {
                this.monsterDamage = Math.floor(Math.random() * 10) + 1;
                this.playerDamage = Math.floor(Math.random() * 20) + 1;
                this.monsterHealth = this.monsterHealth - this.playerDamage;
                this.playerHealth = this.playerHealth - this.monsterDamage;
                this.checkHealth();
                if (this.monsterHealth > 0 && this.playerHealth > 0) {
                    this.gameRecord.unshift(this.monsterMessage + this.monsterDamage, this.playerMessage + this.playerDamage);
                }
            }
        }
    }
});