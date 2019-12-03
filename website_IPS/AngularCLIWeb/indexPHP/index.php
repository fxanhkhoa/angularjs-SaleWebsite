<html>
	<head>
		<meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
	</head>
	<style>
		.image{
			width: 500px;
			height: 500px;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
		body{
			height: 100%;
		}
		html { 
			background: url('eBG.jpg') no-repeat center center fixed; 
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
		.slider {
		}
		.slide1,.slide2,.slide3,.slide4,.slide5 {
		  position: absolute;
		  width: 20%;
		  height: 20%;
		}
		.slide1 {
		  background: url()no-repeat center;
			  background-size: cover;
			animation:fade 8s infinite;
		-webkit-animation:fade 8s infinite;

		} 
		.slide2 {
		  background: url(IPS-LOGO-NOBG.png)no-repeat center;
			  background-size: cover;
			animation:fade2 8s infinite;
		-webkit-animation:fade2 8s infinite;
		}
		.slide3 {
			background: url(http://media.dunkedcdn.com/assets/prod/40946/580x0-9_cropped_1371564896_p17tbq6n86jdo3ishhta3fv1i3.jpg)no-repeat center;
			  background-size: cover;
			animation:fade3 8s infinite;
		-webkit-animation:fade3 8s infinite;
		}
		@keyframes fade
		{
		  0%   {opacity:1}
		  33.333% { opacity: 0}
		  66.666% { opacity: 0}
		  100% { opacity: 1}
		}
		@keyframes fade2
		{
		  0%   {opacity:0}
		  33.333% { opacity: 1}
		  66.666% { opacity: 0 }
		  100% { opacity: 0}
		}
		@keyframes fade3
		{
		  0%   {opacity:0}
		  33.333% { opacity: 0}
		  66.666% { opacity: 1}
		  100% { opacity: 0}
		}
		.container { 
		  height: 80%;
		  width: 80%;
		  //border: 3px solid green; 
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
	</style>
	<body>
		<div class='container'>
			<div class='slider'>
			  <div class='slide1'></div>
			  <div class='slide2'></div>
			</div>
		</div>
	</body>
	
</html>
<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$url_trim = rtrim($actual_link, "/");
	$newURL = $url_trim.":3000";
	//echo $newURL;
	//echo $url_trim;
	//header("refresh:3; url=".$newURL);
?>
