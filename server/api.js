/**
 * Created by Administrator on 2016/10/17.
 */
var xml2js = require('xml2js');
var Character = require('../models/character');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
module.exports = {
    getCharacters: (req, res)=> {
        var gender = req.body.gender;
        var characterName = req.body.name;
        const characterIdLookupUrl = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names=' + characterName;
        var parser = new xml2js.Parser();

        return request.get(characterIdLookupUrl, function (err, request, xml) {
            if (err) return next(err);
            parser.parseString(xml, function (err, parsedXml) {
                if (err) return next(err);
                try {
                    var characterId = parsedXml.eveapi.result[0].rowset[0].row[0].$.characterID;
                    Character.findOne({characterId: characterId}, function (err, character) {
                        if (err) return next(err);
                        if (character) {
                            return res.status(409).send({message: character.name + 'is already in database'});
                        } else {
                            var characterInfoUrl = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=' + characterId;
                            request.get(characterInfoUrl, function (err, request, xml) {
                                if (err)return next(err);
                                parser.parseString(xml, function (err, parsedXml) {
                                    if (err) return res.send(err);
                                    try {
                                        var name = parsedXml.eveapi.result[0].characterName[0];
                                        var race = parsedXml.eveapi.result[0].race[0];
                                        var bloodline = parsedXml.eveapi.result[0].bloodline[0];
                                        var character = new Character({
                                            characterId: characterId,
                                            name: name,
                                            race: race,
                                            bloodline: bloodline,
                                            gender: gender,
                                            random: [Math.random(), 0]
                                        });
                                        character.save(function (err) {
                                            if (err) return next(err);
                                            res.send({message: characterName + 'has been added successfully'});
                                        })
                                    } catch (err) {
                                        res.status(404).send({message: characterName + 'is not a registered'})
                                    }
                                })
                            })
                            return Promise.resolve(characterId)
                        }
                    })
                } catch (err) {
                    return Promise.reject(err)
                }
            })
        })
    }
}