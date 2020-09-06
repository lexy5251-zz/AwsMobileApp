export const createQuestions = () =>
{
   return {
    '1' : {
        "questionText":"You are getting a permission error exception when trying to SSH into your Linux Instance",
        "explanationText": "The exam expects you to know this.",
        "correctAnswers":[
          "the key is missing permissions chmod 0400"
        ],
        "wrongAnswers":[
          "The security group is misconfigured",
          "The Linux instance is misconfigured",
       ]
    },
    "2" : {      
      
        "questionText":"You are getting a network timeout when trying to SSH into your EC2 instance",
        "explanationText": "Any timeout errors means a misconfiguration of your security groups",
        "correctAnswers":[
           "Your security groups are misconfigured"
        ],
        "wrongAnswers":[
           "Your key is missing permissions",
           "The Linux instance is misconfigured",
        ]
     }
   };
};