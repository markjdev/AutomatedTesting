var selenium = require('selenium-webdriver');
var chromedriver = require('chromedriver');
var baseUrl = 'http://localhost:57831/';

describe('Products page test', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();

        this.driver.get(baseUrl).then(done);
    });
	
	 // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });
	
	// Check the project page is shown
	it('It should be on the products page', function(done) {
		this.driver.findElement(selenium.By.tagName('table'))
		.then(function(ele) {
			ele.getAttribute('id').then(function(id) {
				expect(id).toBe('tbl');
				done();
			});
		}, function (err){
			expect(err).toBeNull();
		});

	});
	
	// Test the add new functionality
	it('It should be on the products page', function(done) {
		
		// Check there are 2 items
		this.driver.findElements(selenium.By.xpath("//table[@id='tbl']/tbody/tr")).then(function (elems){
			expect(elems.length).toBe(2);
			done();
		}, function (err){
			expect(err).toBeNull();
		});
		
		
		// Add a new product
		this.driver.findElement(selenium.By.id('addNew')).click();
		this.driver.findElement(selenium.By.id('productName')).sendKeys('Flange');
		this.driver.findElement(selenium.By.id('add')).click();
		done();
		
		// Check there are now 3 items
		this.driver.findElements(selenium.By.xpath("//table[@id='tbl']/tbody/tr")).then(function (elems){
			expect(elems.length).toBe(3);
			done();
		}, function (err){
			expect(err).toBeNull();
		});
		
		// Check the new product has appeared
		this.driver.findElements(selenium.By.xpath("//table[@id='tbl']/tbody/tr/td[text()='Flange']")).then(function (elems){
			expect(elems.length).toBe(1);
			done();
		}, function (err){
			expect(err).toBeNull();
		});
	});
});