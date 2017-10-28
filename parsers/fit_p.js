const root_p = require('./root_p.js');
const logerObjects = require('../logs/lobjects.js');
const pref = require('../preferences.js');

exports.tag = FAC_TAG = 'fit';


exports.FitParser = function FitParser(course, html, loger) {
    const self = this;
    root_p.RootParser.apply(this, arguments);

    this.MAX_SUB_GROUPS_NUMB = 2; // Максимальное количество подгрупп в группе



    let parentLinkLessonsGroupsForSubRow = self.linkLessonsGroupsForSubRow;
    this.linkLessonsGroupsForSubRow = function (subRow, groups){
        return parentLinkLessonsGroupsForSubRow(self.MAX_SUB_GROUPS_NUMB, subRow, groups);
    }


};