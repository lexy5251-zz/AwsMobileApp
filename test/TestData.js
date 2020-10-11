export const createQuestions = () =>
{
   return [{
        "id": "432748367581657",
        "text":"You are getting a permission error exception when trying to SSH into your Linux Instance",
        "explanation": "The exam expects you to know this.",
        "correctAnswers":[
          "the key is missing permissions chmod 0400"
        ],
        "wrongAnswers":[
          "The security group is misconfigured",
          "The Linux instance is misconfigured",
       ]
    },
    {      
        "id": "43274831657",
        "text":"You are getting a network timeout when trying to SSH into your EC2 instance",
        "explanation": "Any timeout errors means a misconfiguration of your security groups",
        "correctAnswers":[
           "Your security groups are misconfigured"
        ],
        "wrongAnswers":[
           "Your key is missing permissions",
           "The Linux instance is misconfigured",
        ]
     }
   ];
};