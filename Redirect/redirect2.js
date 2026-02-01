(function LoadlocalStorage() {
    const localStorageLoad = localStorage.getItem('data');
    if (localStorageLoad) {
        Log(`localStorage sudah didapatkan :D`);
        Log(`Mencoba mengolah localStorage untuk link.`);
        const ExistlocalStorageLoad = JSON.parse(localStorageLoad);
        console.log(ExistlocalStorageLoad); 
        Log(`Membaca Kalender untuk link.`);
        const adate = new Date();
        console.log(adate);
        Log(`Mengolah ${adate} untuk link.`);
        const fullyear = adate.getFullYear();
        let Month = adate.getMonth();
        if (Month <= 8) {
            Month += 1;
            Month = '0' + Month;
        } else {
            Month += 1
        };
        let tanggal = adate.getDate();
        if (tanggal <= 9) {
            tanggal = '0' + tanggal            
        }
        const linkdate = `${fullyear}-${Month}-${tanggal}`;
        console.log(linkdate);
        Log(`Dapet tanggal ${linkdate}`);
        const link = 'https://docs.google.com/forms/d/e/1FAIpQLSeNONTXFATCnSgcJaKYwrmNpaB0yggTUDgtekPaoG0BJrhpzQ/viewform?usp=pp_url&entry.262102708=' + ExistlocalStorageLoad.Data.NamaLengkap + '&entry.1448140492=' + ExistlocalStorageLoad.Data.Kelas + '&entry.1936882981=' + ExistlocalStorageLoad.Data.Alamat + '&entry.1331619608=' + ExistlocalStorageLoad.Data.NomorWA + '&entry.1694515240=' + linkdate;
        console.log(link);
        Log(`Dapet link ${link} tinggal Redirect.`);
        window.location.href = link
    } else {
        Log(`localStorage gagal didapatkan, coba input ulang di https://codeeggington.github.io/SmanndungFormShortcut/`, 'failed')
    }
})()

function Log(text, state = 'success') {
    const body = document.getElementById('test');
    console.log(body);
    const element = document.createElement('p');
    element.className = state;
    element.textContent = `> ${text}`;
    body.appendChild(element);
}