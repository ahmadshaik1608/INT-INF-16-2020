var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var ObjectId = mongo.Types.ObjectId;
const chaptersTable=require('../../model/alumnichapters');
const { update } = require("../../model/alumnichapters");

var getChaptersData=async function(callBack)
{
    await chaptersTable.aggregate([
        // {
        // $unwind:{path:"$coordinators", preserveNullAndEmptyArrays: true} },
      {$lookup:{
        from: 'alumni',
        localField: 'coordinators',
        foreignField: '_id',
        as: 'coordinatorsData'
      }},
      //  { $unwind:{path:"$members", preserveNullAndEmptyArrays: true} },
       {$lookup:{
        from: 'alumni',
        localField: 'members',
        foreignField: '_id',
        as: 'membersData'
      }},
      // { $unwind:{path:"$events", preserveNullAndEmptyArrays: true} },
      {$lookup:{
        from: 'chapterevents',
        localField: 'events',
        foreignField: '_id',
        as: 'eventsData'
      }},
       {
         $group: {
             _id: '$_id',
         
            // coordinators: { $push: '$coordinators' },
           //  members:{$push:'$members'},
      //       events:{$push:'$events'},
            //  membersData:{$push:{$cond:{if:{$ne:['$membersData',[]]},
            //                                 then:'$membersData'  ,
            //                                    else:"$$REMOVE"}}},
            // coordinatorsData:{$push:{$cond:{if:{$ne:['$coordinatorsData',[]]},
            //                                 then:'$coordinatorsData'  ,
            //                                  else:"$$REMOVE"}}},
      //       eventsData:{$push:{$cond:{if:{$ne:['$eventsData',[]]},
      //                                       then:'$eventsData'  ,
      //                                         else:"$$REMOVE"}}},
                root: { $mergeObjects: '$$ROOT' },
         }
       },
      // { $sort : { "created":-1} },
      {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: ['$root', '$$ROOT']
            }
        }
    },
    {
      $project:{
           root:0
        }
      }
   ]).then(chdata=>{
     console.log(chdata);
   return callBack(chdata)
   })
}

var createChapter= async function(req,imagepath ){
 await chaptersTable.insertMany({chaptername:req.name,image:imagepath,description:req.description,location:req.location,chaptermail:req.mail,chapterphone:req.contact});


}

var deleteChapter=async function(id){
  await chaptersTable.remove({_id:ObjectId(id)})
}

var updateChapterData=async function(id,data){
  await chaptersTable.updateOne({_id:ObjectId(id)},data)
}

var updateChapterImage=async function(id,imagepath){
  await chaptersTable.updateOne({_id:ObjectId(id)},{image:imagepath})
}

module.exports = {
    chapterData :getChaptersData,
    createChapter:createChapter,
    deleteChapter:deleteChapter,
    updateChapterData:updateChapterData,
    updateChapterImage:updateChapterImage
}