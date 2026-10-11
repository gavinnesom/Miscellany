from pathlib import Path
import math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle, FancyArrowPatch
from xml.etree import ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/images'; PREVIEW=Path('/tmp/miscellany-vehicle-previews');PREVIEW.mkdir(exist_ok=True)
plt.rcParams.update({'font.size':13,'font.family':'DejaVu Sans','svg.fonttype':'none','svg.hashsalt':'miscellany-vehicle-v1','axes.spines.top':False,'axes.spines.right':False,'axes.titleweight':'bold'})
blue='#165c89'; red='#bd493d'; green='#217457'; gray='#566675'; gold='#9c6a16'
def save(fig,name,title,desc):
 if name in ['vehicle-braking-energy','vehicle-gearing-tradeoff','vehicle-suspension-response','vehicle-differential-speeds']:
  fig.subplots_adjust(bottom=.23)
 fig.savefig(OUT/(name+'.svg'),bbox_inches='tight',facecolor='white',metadata={'Date':None})
 fig.savefig(PREVIEW/(name+'.png'),bbox_inches='tight',facecolor='white',dpi=100)
 plt.close(fig)
 p=OUT/(name+'.svg');s=p.read_text();i=s.index('>',s.index('<svg'))+1
 from html import escape
 s=s[:i]+'\n<title>'+escape(title)+'</title><desc>'+escape(desc)+'</desc>'+s[i:];p.write_text(s)
def blank(w=10,h=6):
 fig,ax=plt.subplots(figsize=(w,h));ax.set_xlim(0,10);ax.set_ylim(0,6);ax.axis('off');return fig,ax
def arrow(ax,a,b,c=blue,style='-|>',lw=2.2):
 ax.add_patch(FancyArrowPatch(a,b,arrowstyle=style,mutation_scale=16,color=c,lw=lw))
def node(ax,xy,label,color=blue):
 ax.text(*xy,label,ha='center',va='center',color=color,fontsize=13,bbox=dict(boxstyle='round,pad=0.3',fc='white',ec=color,lw=1.4))
# Real functional power network: branches, a storage node, and reversible electrical path.
fig,ax=blank(11,6)
ax.set_title('Energy paths in a conventional combustion car',pad=16)
node(ax,(.7,4.7),'Fuel')
node(ax,(2.8,4.7),'Engine')
node(ax,(5.4,4.7),'Driveline')
node(ax,(8.5,4.7),'Vehicle motion\n+ elevation')
arrow(ax,(1.1,4.7),(2.2,4.7));arrow(ax,(3.4,4.7),(4.6,4.7));arrow(ax,(6.1,4.7),(7.5,4.7))
ax.text(4,5.15,'shaft work',ha='center',fontsize=11)
node(ax,(2.8,2.7),'Coolant / oil\n+ exhaust',red)
arrow(ax,(2.8,4.3),(2.8,3.2),red)
node(ax,(2.8,.85),'Surroundings',red)
arrow(ax,(2.8,2.15),(2.8,1.2),red)
node(ax,(5.4,2.7),'Alternator')
arrow(ax,(3.5,4.45),(5.05,3.05))
node(ax,(8.5,2.7),'Brake heat',red);arrow(ax,(8.5,4.15),(8.5,3.15),red)
node(ax,(5.4,.55),'Electrical loads',green);node(ax,(6.8,1.6),'DC bus',green)
arrow(ax,(5.85,2.35),(6.35,1.9),green);arrow(ax,(6.3,1.25),(5.7,.88),green)
node(ax,(8.5,.55),'Battery',green);arrow(ax,(7.25,1.25),(8.1,.88),green,style='<->')
ax.text(8.7,1.5,'store / supply',ha='center',fontsize=11,color=green)
ax.text(8.5,3.65,'slowing down',ha='center',fontsize=11,color=red)
ax.text(7.15,5.7,'Tire/air losses also transfer heat',ha='center',fontsize=11,color=red)
ax.text(5,-.2,'Functional energy network, not component positions. Arrow widths do not encode amounts.',ha='center',fontsize=11)
save(fig,'vehicle-energy-paths','Vehicle energy paths','Fuel energy branches into shaft work and heat. Shaft work supplies drivetrain and electrical loads. Motion can be dissipated at brakes. Battery stores or supplies electrical energy; not all paths operate simultaneously.')
# Slider crank geometry: same scale and rod lengths in all panels.
fig,axes=plt.subplots(1,3,figsize=(10,5.2),sharex=True,sharey=True)
r=40;l=140
for ax,theta,label in zip(axes,[0,math.pi/2,math.pi],['0°: top','90°: beyond halfway','180°: bottom']):
 pin=np.array([r*math.sin(theta),r*math.cos(theta)])
 piston=np.array([0,pin[1]+math.sqrt(l*l-pin[0]**2)])
 ax.add_patch(Circle((0,0),r,fill=False,color='#c5ccd2',ls='--'))
 ax.plot([0,pin[0]],[0,pin[1]],color=blue,lw=5)
 ax.plot([pin[0],0],[pin[1],piston[1]],color=gold,lw=5)
 ax.add_patch(Rectangle((-22,piston[1]-9),44,18,facecolor='#dae6ee',edgecolor=blue,lw=2))
 for x,y in [(0,0),tuple(pin),tuple(piston)]:ax.plot(x,y,'o',mfc='white',mec=gray,ms=7)
 ax.plot([-26,-26],[78,199],color=gray,lw=1);ax.plot([26,26],[78,199],color=gray,lw=1)
 ax.axhline(180,color=red,ls=':',lw=1)
 x=180-piston[1]
 ax.text(0,220,label,ha='center',fontsize=13)
 ax.text(0,-68,f'Travel: {x:.2f} mm',ha='center',fontsize=12)
 ax.set_aspect('equal');ax.set_xlim(-65,80);ax.set_ylim(-75,240);ax.axis('off')
fig.suptitle('A rigid rod constrains piston motion',fontsize=18)
fig.text(.5,.02,'r = 40 mm; l = 140 mm; no offset. Dashed red line: top piston-pin position.',ha='center',fontsize=12)
save(fig,'vehicle-slider-crank','Slider-crank geometry','Calculated geometry for 40 mm crank radius and 140 mm connecting rod, at 0, 90 and 180 degrees. Rod length is constant. Ninety-degree piston travel is 45.84 mm, not 40 mm.')
# Gearing chart preserves independently meaningful axes rather than mixed units.
fig,ax=plt.subplots(figsize=(9,5.4))
for rpm,torque,label,c in [(2400/10.5,1701,'3.0:1 gear',blue),(2400/3.5,567,'1.0:1 gear',green)]:
 ax.add_patch(Rectangle((0,0),rpm,torque,fill=False,edgecolor=c,lw=2.5,ls='-' if c==blue else '--'))
 ax.plot(rpm,torque,'o',c=c,ms=9)
 ax.annotate(label,(rpm,torque),xytext=(12,8),textcoords='offset points',color=c)
ax.set_xlim(0,850);ax.set_ylim(0,2000);ax.set_xlabel('Wheel speed (rpm)');ax.set_ylabel('Total axle torque (N·m)');ax.grid(alpha=.2)
ax.set_title('Same wheel power, different torque and speed')
ax.text(405,1280,'Equal rectangle areas\n= equal torque × rpm\n= 40.7 kW wheel power',fontsize=14,bbox=dict(fc='white',ec='#cccccc'))
fig.text(.5,.01,'Engine: 180 N·m at 2,400 rpm. Final drive: 3.5:1. Overall efficiency: 90%.',ha='center',fontsize=11)
save(fig,'vehicle-gearing-tradeoff','Gear reduction conserves power minus losses','Output points 228.6 rpm and 1701 N m versus 685.7 rpm and 567 N m. Rectangle areas show equal torque-speed product, 40.7 kW.')
fig,ax=plt.subplots(figsize=(9,5.2));v=np.linspace(0,120,200);e=.5*1400*(v/3.6)**2/1000
ax.plot(v,e,color=red,lw=3);ax.fill_between(v,e,alpha=.07,color=red)
for speed in [50,100]:
 energy=.5*1400*(speed/3.6)**2/1000
 ax.plot([speed,speed],[0,energy],':',color=gray);ax.plot(speed,energy,'o',color=red)
 ax.annotate(f'{speed} km/h: {energy:.0f} kJ',(speed,energy),xytext=(-120,20) if speed==100 else (15,10),textcoords='offset points')
ax.set(xlim=(0,125),ylim=(0,850),xlabel='Road speed (km/h)',ylabel='Translational kinetic energy (kJ)',title='Twice the speed, four times the energy');ax.grid(alpha=.2)
fig.text(.5,.01,'Hypothetical 1,400 kg car. E = ½mv²; rotational energy omitted.',ha='center',fontsize=12)
save(fig,'vehicle-braking-energy','Braking energy grows with speed squared','Parabola of translational kinetic energy for 1400 kg. 50 km/h corresponds to 135 kJ and 100 km/h to 540 kJ.')
# Ackermann in physical Cartesian coordinates: front y=L, rear y=0; center at (-R,0).
fig,ax=plt.subplots(figsize=(10,5.6));L=2.7;t=1.6;R=6
center=np.array([-R,0.]);ax.plot(*center,'o',color=red);ax.text(-R,.22,'Turning center',ha='center',color=red)
ax.plot([-R,1.15],[0,0],ls='--',color=gray,lw=1)
for x in [-t/2,t/2]:
 front=np.array([x,L]);d=math.atan2(L,R+x)
 ax.plot([center[0],front[0]],[0,L],ls='--',color=gray,lw=1)
 direction=np.array([-math.sin(d),math.cos(d)])
 a=front-.3*direction;b=front+.3*direction
 ax.plot([a[0],b[0]],[a[1],b[1]],color=blue,lw=9,solid_capstyle='round')
 ax.plot([x,x],[-.3,.3],color=blue,lw=9,solid_capstyle='round')
 ax.plot([x,x],[.4,L-.4],color='#bbc4cb',lw=1)
 ax.text(x-.18,L+.65,f'{math.degrees(d):.1f}°',ha='center',color=blue)
 ax.text(x-.18,L+.98,'inside' if x<0 else 'outside',ha='center',fontsize=12)
ax.plot([-.8,.8],[L,L],color='#bbc4cb',lw=1)
arrow(ax,(1.2,0),(1.2,2.7),gray,style='<->');ax.text(1.4,1.35,'L = 2.7 m',rotation=90,va='center')
arrow(ax,(-.8,-.7),(.8,-.7),gray,style='<->');ax.text(0,-1,'t = 1.6 m',ha='center')
arrow(ax,(-6,-1.1),(0,-1.1),red,style='<->');ax.text(-3,-1.45,'R = 6.0 m',ha='center',color=red)
ax.set_aspect('equal');ax.set_xlim(-6.9,2);ax.set_ylim(-1.8,4.2);ax.axis('off');ax.set_title('Slow rolling: wheel normals share one turning center')
fig.text(.5,.02,'Plan view; front at top. Tire deformation and slip angles omitted.',ha='center',fontsize=12)
save(fig,'vehicle-ackermann','Ideal Ackermann geometry','Exact hypothetical geometry for wheelbase 2.7 m, track 1.6 m and rear midpoint radius 6 m. Lines normal to the front wheels intersect on the rear axle at the turn center.')
fig,ax=plt.subplots(figsize=(9,5));times=np.linspace(0,3,600);m=350;k=25000;c=1500;wn=math.sqrt(k/m);a=c/(2*m);wd=math.sqrt(wn*wn-a*a)
ax.plot(times,np.cos(wn*times),color=gray,ls='--',lw=1.5,label='No damping')
response=np.exp(-a*times)*(np.cos(wd*times)+a/wd*np.sin(wd*times))
ax.plot(times,response,color=blue,lw=3,label='c = 1,500 N·s/m')
ax.set(xlabel='Time after release (s)',ylabel='Displacement / initial displacement',title='Damping removes stored oscillation energy',ylim=(-1.15,1.35));ax.grid(alpha=.2);ax.legend(loc='upper right',fontsize=11)
fig.text(.5,.01,'One-mass model: m = 350 kg, k = 25,000 N/m; fixed base; initial velocity zero.',ha='center',fontsize=11)
save(fig,'vehicle-suspension-response','Calculated damped response','Analytical response from rest at unit initial displacement. Undamped oscillation remains; viscous damping causes decay. Not a measured car response.')
# Parallel bus with source and switched load branches.
fig,ax=blank(11,6);ax.set_title('One bus, multiple branches',pad=15)
ax.plot([1,9],[4.8,4.8],color=red,lw=3);ax.plot([1,9],[1.2,1.2],color=blue,lw=3)
ax.text(.5,5.25,'Positive bus',color=red);ax.text(.5,.65,'Return to battery negative / chassis bonds',color=blue)
for x in [1.3,3.8,6.3,8.8]:
 ax.plot([x,x],[4.8,3.45],color=gray,lw=2);ax.plot([x,x],[2.55,1.2],color=gray,lw=2)
 for y in [1.2,4.8]:ax.plot(x,y,'o',color=gray,ms=4)
node(ax,(1.3,3),'Battery',green);node(ax,(3.8,3),'Alternator\n+ rectifier',green);node(ax,(6.3,3),'Lamp /\nother loads');node(ax,(8.8,3),'Starter\nmotor')
# Switch gap in starter branch: white background wipes only short section.
ax.plot([8.8,8.8],[3.85,4.25],color='white',lw=5);ax.plot([8.8,9.02],[3.85,4.18],color=gray,lw=2)
ax.text(8.45,4.05,'contact',ha='right',fontsize=11)
arrow(ax,(.75,2),(.75,4.1),green,style='<->');ax.text(.36,3,'charge / supply',rotation=90,ha='center',va='center',fontsize=10,color=green)
ax.text(5,.05,'Functional topology only. Regulation, ignition, fuses, relays, and individual return paths omitted.',ha='center',fontsize=11)
save(fig,'vehicle-electrical-bus','Parallel electrical bus','Battery, rectified alternator and electrical loads connect in parallel to supply and return conductors. Starter has a switched branch. The battery can supply or absorb current.')
# Difference/average differential chart: geometrically true speed relationship rather than invented bevel teeth.
fig,ax=plt.subplots(figsize=(9,4.5));labels=['Inside wheel','Carrier average','Outside wheel'];vals=[460,500,540]
ax.barh(labels,vals,color=[blue,gray,green]);ax.axvline(500,color=red,ls='--',lw=1.5)
for i,v in enumerate(vals):ax.text(v+7,i,f'{v} rpm',va='center')
ax.set(xlim=(0,640),xlabel='Rotational speed (rpm)',title='The carrier fixes the average, not each wheel speed');ax.invert_yaxis()
fig.text(.5,.01,'Ideal turn: midpoint radius 10 m; track 1.6 m. (460 + 540) / 2 = 500.',ha='center',fontsize=12)
save(fig,'vehicle-differential-speeds','Differential average and unequal wheel speeds','Calculated wheel speeds in a low-speed turn: inside 460 rpm, outside 540 rpm, carrier 500 rpm. No bevel-gear tooth geometry is asserted.')
# Cooling circuit topology: bypass is the point, not a linear box sequence.
fig,ax=blank(10,6);ax.set_title('Coolant circulation with a radiator bypass',pad=15)
node(ax,(1.5,3),'Pump',blue);node(ax,(4,3),'Engine',red);node(ax,(6.4,3),'Thermostat',red);node(ax,(8.5,4.8),'Radiator',red)
arrow(ax,(2.05,3),(3.4,3));arrow(ax,(4.6,3),(5.65,3),red);arrow(ax,(6.85,3.3),(8.15,4.4),red)
ax.plot([8.5,8.5,1.5],[5.15,5.65,5.65],color=blue,lw=2);arrow(ax,(1.5,5.65),(1.5,3.4),blue)
ax.plot([6.4,6.4,1.5],[2.6,1.3,1.3],color=gold,lw=2);arrow(ax,(1.5,1.3),(1.5,2.6),gold)
ax.text(4,1.6,'Bypass favors warm-up',ha='center',color=gold);ax.text(4,5.15,'Cooler return',ha='center',color=blue)
arrow(ax,(9.1,4.8),(9.9,4.8),red);ax.text(9.4,4.15,'heat to air',ha='center',fontsize=10,color=red)
ax.text(5,.3,'Illustrative circuit topology. Actual bypass, heater, pump and thermostat locations vary.',ha='center',fontsize=11)
save(fig,'vehicle-cooling-bypass','Cooling loop and bypass','Functional circuit: pump circulates through engine. Thermostat apportions radiator route and bypass return, allowing warm-up without full radiator heat rejection. Not vehicle-specific plumbing.')
print('Generated',len(list(OUT.glob('*.svg'))),'SVGs with PNG previews')
