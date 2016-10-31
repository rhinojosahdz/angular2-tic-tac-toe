import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
    next = 'red';
    redWins = 0;
    blueWins = 0;
    whoStarted = this.next;
    rows = [
        {blocks: [{owner: null},{owner: null},{owner: null}]}
        , {blocks: [{owner: null},{owner: null},{owner: null}]}
        , {blocks: [{owner: null},{owner: null},{owner: null}]}
    ];

    select(block){
        if(block.owner !== null){
            return;
        }
        block.owner = this.getNext();
        this.changeNext();
        this.checkForWinner();
    }

    getNext(){
        return this.next;
    }

    changeNext(){
        if(this.next === 'red'){
            this.next = 'blue';
        }
        else{
            this.next = 'red';
        }
    }

    checkForWinner(){
        setTimeout(() => { // we wait a little bit so that the UI can get updated, if we use function(){} it doesn't work (seems like this. only works with () => {})
            if(this.checkIfColorWon('red')){
                alert('Red won');
                this.redWins++;
                this.restart();
            }
            if(this.checkIfColorWon('blue')){
                alert('Blue won');
                this.blueWins++;
                this.restart();
            }
            if(this.allBlockHaveOwner()){
                alert('Is a tie');
                this.restart();
            }
        },100);
    }

    restart(){
        this.rows.forEach(row => row.blocks.forEach(b => b.owner = null));
        if(this.whoStarted === 'blue'){
            this.next = 'red';
            this.whoStarted = 'red';            
        }
        else{
            this.next = 'blue';
            this.whoStarted = 'blue';
        }
    }

    allBlockHaveOwner(){
        return this.rows.filter(r => r.blocks[0].owner && r.blocks[1].owner && r.blocks[2].owner).length === 3;
    }

    checkIfColorWon(color){
        let r = this.rows;
        let won = 
        //vertical
        r[0].blocks[0].owner === color &&
        r[1].blocks[0].owner === color &&
        r[2].blocks[0].owner === color
        ||
        r[0].blocks[1].owner === color &&
        r[1].blocks[1].owner === color &&
        r[2].blocks[1].owner === color
        ||
        r[0].blocks[2].owner === color &&
        r[1].blocks[2].owner === color &&
        r[2].blocks[2].owner === color
        //horizontal
        ||
        r[0].blocks[0].owner === color &&
        r[0].blocks[1].owner === color &&
        r[0].blocks[2].owner === color
        ||
        r[1].blocks[0].owner === color &&
        r[1].blocks[1].owner === color &&
        r[1].blocks[2].owner === color
        ||
        r[2].blocks[0].owner === color &&
        r[2].blocks[1].owner === color &&
        r[2].blocks[2].owner === color
        //diagonal
        ||
        r[0].blocks[0].owner === color &&
        r[1].blocks[1].owner === color &&
        r[2].blocks[2].owner === color
        ||
        r[2].blocks[0].owner === color &&
        r[1].blocks[1].owner === color &&
        r[2].blocks[0].owner === color
        
        return won;
    }
}
