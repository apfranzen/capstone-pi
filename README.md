sudo ./rslsync
~/.btsync

http://10.2.10.156:8888/gui/#
https://www.resilio.com/blog/sync-wd-raspberry-pi
sudo ifconfig

didn't work: https://www.resilio.com/blog/sync-hacks-how-to-sync-without-data-loss-using-btsync-raspberry-pi

https://ml.internalpositioning.com/dashboard/precisepointer
https://doc.internalpositioning.com/api/#get-location

https://www.npmjs.com/package/request-promise

https://www.npmjs.com/package/axios

http https://ml.internalpositioning.com/location group==precisepointer user==yolo

sudo:
1. new picture get's loaded into ./pics
  - store filename as a `var picToUpload`
2. chokidar detect on 'add' and invokes a `get` request to find to get `location`
  - store location as a `var currrentLocation`
3. take `var picToUpload` and upload to cloudinary and set location as metadata for that picture
 - on success, get the compass orientation, url
