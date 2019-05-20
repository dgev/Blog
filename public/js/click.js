$('#read1').click(async function(e) {
  e.preventDefault();
  await getid();
  read1();
})

$('#read2').click(async function(e) {
  e.preventDefault();
  await getid();
  read2();
})

$('#read3').click(async function(e) {
  await getid();
  read3();
})
