import {spawnSync} from 'node:child_process';
import {existsSync,readdirSync,mkdirSync,unlinkSync} from 'node:fs';
import path from 'node:path';
const dir=process.cwd();
const raw=path.join(dir,'out','render-with-audio.mp4');
const output=path.join(dir,'out','一起鲸动.mp4');
mkdirSync(path.join(dir,'out'),{recursive:true});
const result=spawnSync(process.execPath,[
 path.join(dir,'node_modules','@remotion','cli','remotion-cli.js'),'render','src/index.ts','WhaleMotion',raw,'--codec=h264','--crf=18','--audio-bitrate=320k',...process.argv.slice(2)
],{stdio:'inherit'});
if(result.status!==0)process.exit(result.status||1);
let ffmpeg=process.env.FFMPEG_EXECUTABLE;
if(!ffmpeg){
 const parent=path.join(dir,'node_modules','@remotion');
 for(const entry of readdirSync(parent).filter(s=>s.startsWith('compositor-'))){
  const candidate=path.join(parent,entry,process.platform==='win32'?'ffmpeg.exe':'ffmpeg');
  if(existsSync(candidate)){ffmpeg=candidate;break;}
 }
}
const mux=spawnSync(ffmpeg||'ffmpeg',[
 '-v','error','-y','-i',raw,'-i','public/music.wav','-map','0:v:0','-map','1:a:0','-c:v','copy',
 '-af',"atrim=end=45,asetpts=PTS-STARTPTS,volume='0.9*min(1,max(0,(45-t)/0.7))':eval=frame",
 '-c:a','aac','-b:a','320k','-ar','48000','-t','45','-movflags','+faststart',
 '-metadata','title=一起鲸动','-metadata','comment=Made with Remotion; 45 seconds / 1350 frames',output
],{stdio:'inherit'});
if(mux.status!==0)process.exit(mux.status||1);
unlinkSync(raw);
console.log('Exported:',output);
