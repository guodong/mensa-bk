
Libmensa.createWindow({
  content: `
  <div style="text-align: ;padding: 20px">
	<h1>Welcome to Mensa</h1>
	<p>Mensa is a project under CloudwareHub. This is a public demonstration version of Mensa</p>
	<h2>More Info</h2>
	<p>
		Visit the&nbsp;<a href="https://github.com/guodong/mensa"
			target="_blank">Github page</a> or official&nbsp;<a
			href="http://www.cloudwarehub.com" target="_blank">CloudwareHub</a>
	</p>
	<h2>Community</h2>
	<p>
		If you discover any bugs, have suggestions or questions, feel free to
		leave a&nbsp;<a
			href="https://github.com/cloudwarehub/mensa/issues/new"
			target="_blank">issue on github</a>
	</p>
	
</div>
  `,
  styles: {
    width: '500px',
    left: '400px',
    top: '100px'
  },
  
}, function(window) {
  window.show();
  window.on('destroy', function() {
    Libmensa.exit();
  })
});