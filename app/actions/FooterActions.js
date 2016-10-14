/**
 * Created by Administrator on 2016/10/14.
 */
import alt from '../alt';
import $ from 'jquery';
class FooterAction {
    constructor() {
        this.generateActions(
            'getTopCharacterSuccess',
            'getTopCharactersFail'
        );
    }

    getTopCharacters() {
        $.ajax({url: '/api/characters/top'})
            .done((data)=> {
                this.actions.getTopCharactersSuccess(data)
            })
            .fail((jqXhr)=> {
                this.actions.getTopCharactersFail(jqXhr)
            })
    }
}
export default  alt.createActions(FooterAction);