/**
 * Created by Administrator on 2016/10/14.
 */
import alt from '../alt';
import $ from 'jquery';
class AddCharacterActions {
    constructor() {
        this.generateActions(
            'addCharacterSuccess',
            'addCharacterFail',
            'updateName',
            'updateGender',
            'invalidName',
            'invalidGender'
        );
    }

    addCharacter(name, gender) {
        $.ajax({
            type: 'POST',
            url: '/api/characters',
            data: {name: name, gender: gender}
        })
            .done((data)=> {
                this.actions.addCharacterSuccess(data.message);
            })
            .fail((jqXhr)=> {
                this.actions.addCharacterFail(jqXhr.responeJSON.message);
            })
    }
}
export default alt.createActions(AddCharacterActions);