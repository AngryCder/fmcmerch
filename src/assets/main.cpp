#include <iostream>
#include<math.h>
#include<conio.h>

using namespace std;

int main()
{    int i;
     float T,pcd,cp,dp,m,A,D,toothThickness,clearance,theta,acd,bcd,dcd;

    /*where,
      T=total number of teeth;
      pcd=pitch circle diameter;
      cp=circular pitch;
      dp= diametrical pitch;
      m=module;
      A=addendum;
      D=dedendum;
      acd=addendum circle diameter;
      dcd= dedendum circle diameter;
      bcd=base circle diameter;
      theta= pressure angle */
      cout<<"enter the amount of teeth given and pressure angle in radian"<<endl;
      cin>>T>>theta;
      cout<<"enter 1 if module is given as input and enter 2 if circular pitch is given"<<endl;
      cout<<"enter 3 if diameter pitch is given as input and enter 4 if pitch circle diameter is given"<<endl;
      cin>>i;
      switch(i)
      {
      case 1:
        cout<<"module should be in mm";
        cin>>m;
        pcd=m*T;//pitch circle diameter= module*no. of teeth;
        cp=3.14*m;//circular pitch= pie*module;
        dp=T/pcd;
        clearance=0.157*m;// clearance 0.157*module;
        A=m;//addendum=module;
        D=1.157*m;// dedendum =addendum + clearance;
        toothThickness=1.57*m;//toothThickness=1.57*module;
        acd=pcd + 2*A;// addendum circle diameter= pitch cicle diameter- 2*addendum;
        dcd=pcd - 2*D;//dedendum circle diameter = pitch circle diameter -2* dedendum;
        bcd=pcd*cos(theta);
        break;
      case 2:
        cout<<"circular pitch should be in (no. of teeth/mm)";
        cin>>cp;
        m=cp/3.14;
        pcd=m*T;
        clearance=0.157*m;
        A=m;
        D=1.157*m;
        toothThickness=1.57*m;
        acd=pcd + 2*A;
        dcd=pcd - 2*D;
        bcd=pcd*cos(theta);
        break;
      case 3:
        cout<<"diametrical pitch should be in (no. of teeth/mm)";
        cin>>dp;
        pcd=T/dp;
        m=pcd/T;
        cp=3.14*m;
        clearance=0.157*m;
        A=m;
        D=1.157*m;
        toothThickness=1.57*m;
        acd=pcd + 2*A;
        dcd=pcd - 2*D;
        bcd=pcd*cos(theta);
        break;
      case 4:
        cout<<"pitch circle diameter should be in mm";
        cin>>pcd;
        m=pcd/T;
        cp=3.14*m;
        clearance=0.157*m;
        A=m;
        D=1.157*m;
        toothThickness=1.57*m;
        acd=pcd + 2*A;
        dcd=pcd - 2*D;
        bcd=pcd*cos(theta);
        break;
        }
      cout<<"pitch circle diameter ="<<pcd<<"mm"<<endl;
      cout<<"circular pitch ="<<cp<<"(1/mm)"<<endl;
      cout<<"diametrical pitch ="<<dp<<"(1/mm)"<<endl;
      cout<<"clearance="<<clearance<<endl;
      cout<<"tooth thickness="<<toothThickness<<endl;
      cout<<"addendum circle diameter="<<acd<<endl;
      cout<<"dedendum circle diameter="<<dcd<<endl;
      cout<<"base circle diameter="<<bcd<<endl;
      getch();
    return 0;
}






/* Name-Karyamsetty Martin
   Roll no-18135052*/ 
