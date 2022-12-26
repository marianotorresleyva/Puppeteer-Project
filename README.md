/**
 * I think in loop when the url is the same when the begin
 * then stop beacuse means to loop is done
 * 
 * The URL is the init & the final are the same 
 * 
 * from each url / location have to evaluate
 * if is is a video or a list
 * 
 * if is a video has to click on play and wait through 5 second, after that click on "next activity"
 * if is the list save the url and click "next activity"
 * y asi hasta que acabe todo y regrese donde empezo
 * 
 * 
 * but what happend is never end?
 * 
 */

/**
 * #task-content > div > div.formattedText
 * 
 */

// DIVIDE AND CONQUER 
// THE NEXT METHOS LOOK SO THAT HAVE SO MUCH IN CHARGE
// CHECK IT 

/**
 * const selectors = ['#selector1', '#selector2', '#selector3'];

await page.evaluate(async (selectors) => {
  const promises = selectors.map((selector) => {
    return page.waitForSelector(selector, { visible: true });
  });

  const result = await Promise.any(promises);
  console.log(`Clicking the first visible element: ${result.selector}`);
  await result.click();
}, selectors);
 */
// navegacion automatica + validacion 
/**
 * Validacion puede ser:
 *      - url 
 *      - selector
 */
/**
 * There 2 types to Navigation
 *      - Web Navigation
 *          - Click to redirect 
 *          - Wait to window Loaded
 *      - Course Navigation
 *          - extend from Web Navigation
 *          - Validate selector
 *          
 */
/**
 * Per Page {
 *      url
 *      Selector
 *      where the things is happend
 *      time
 * }
 * Dentro del loop quiero saber por donde estoy 
 */