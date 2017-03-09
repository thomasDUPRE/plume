	function notifier (typeInfo,message,url) 
	{
         $.notify( {  message: message, target: url} , 
                   { type : typeInfo , delay: 4000}   
                 );
     }


     function jourOuvrables (dateDebut,dateFin,departMatin,retourMatin) 
          {
           
           jour= 0.0;
           momentFin = moment(dateFin,'DD/MM/YYYY');
           momentDebut = moment(dateDebut,'DD/MM/YYYY');
          
                   
           while (momentDebut < momentFin)
           {
               
              if (momentDebut.isoWeekday() != 6 &&  momentDebut.isoWeekday() != 7 )
                 {
                  jour +=1 ;
                }
               momentDebut = momentDebut.add(1,'days');
              
           }

           if(departMatin == 1 && retourMatin == 0  )
             {
               jour += 0.5;
             }

            if(departMatin == 0 && retourMatin == 1 && jour > 0 )
             {
               jour -= 0.5;
             }

         
           return jour ;
          }


