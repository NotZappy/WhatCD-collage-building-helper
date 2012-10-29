// ==UserScript==
// @name        What.CD :: Collage Building Helper
// @author      Z4ppy
// @namespace   Z4ppy.What.CD
// @description Make it easier to build your collage.
// @include     https://*what.cd/torrents.php*
// @include     https://*what.cd/collages.php*
// @include     https://*what.cd/collage.php*
// @include     https://*what.cd/artist.php*
// @updateURL   http://userscripts.org/scripts/source/142458.meta.js
// @version     0.5
// @date        2012-10-29
// ==/UserScript==

// Changelog can be found at https://userscripts.org/topics/118127

var fullActiveURL = document.URL;
var site_base_url = fullActiveURL.match(/^(https:\/\/(ssl\.)?what\.cd)/)[1];
var collageID, collName;
// Momenticons: http://findicons.com/icon/263495/folder_open_add
var ICON_ADD = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACmUlEQVR4nIWRS0hVURSGv33Ovp57j0oqV7Qkil5mEwNDKoILikQjg6Jykg0qIrIkwkySbOANahBYCj0oigoLCyxqpFRIUHTLHlb0tCJTTK2b9+HjnLMbHDOjsjXca+1vfaxfKKVoOTUz/01X9N7IcBQAw5uMIWMFGyoHb/KfEsdqfGtT/HMb16xaCdHngILEbC5dvsrAlzdFW2riLZMCjtdmqk2l61H9t0BZgAPCQKQu5UxjE+Fw3/iwLr1k+FN9q7e9Hfr5JuOxMERegh0HoSN0AWoYwm2UFueCNNxJI5OO1zYfX7eKiQYSAMdGKRvLcjh7rZPYsBprP/ubdaxurwmApusfxgCjaFjcbu+ndONJpPMJhQ1MXOagCQVCgPJA2iKOHij56AJsBysWQU8rwjPchoo8RCg14bMABEoIUAphzuTtg26SszJ3ugAsbj+OEChejDNwEWVFQGhuSynQvOjmbPDNB6FD0ixaL1Tc3VzdFXIBQ1FsfwEy1o4T63PFhZsoykIz02joinDgfT0CRWnKEraXXAyOH/FWRz+BwCrUl3MwEgc0lyAT0BIyICmPnr4eqgM7kB548qjje/qcZRaQKQFsXzZG9D5WtMdVdlNHmnNp+Kpz5Ml5wqMRtqabSAmXum+YN05nXS5buKtJHN7jVeVlJ6D3Cox8++UuJGSsYHpLkOpAOb3RTtq7WvEmQv6MIqYmz2B382GklB7q6jf/LW9SprxD+B10zUbXwPCBYehIXSAlCARC/RbXHzXv0P3g/hMd9cWDo4MJlcvX6bqE4PVGO8mTPFK2cFfTpIBXn1t986YVpgB5++5UHVywwMyRmuDps+iLmqXBCmAsxn+tn1YYB+JAyG+mhyqba3NAsDO3KgSEgJ4f88//Bf3Zb/0AAAAASUVORK5CYII=';
// Yusuke Kamiyamane: http://findicons.com/icon/118036/cross
var ICON_ERR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAX5JREFUeNrEU71OwlAUPrVqrDFBHsARX6AJri4kJSEyEBMHggkLK8EEFsauvoPo4iN04gkgLiYOOBHUxDSUCBO0XL9z7a1t1YnBJl967/l+enIOaEII2uTZog2fbXW41zTSiSwcbaAbEDl+TJTmLsLO4x1YIOzzTscMvoRWmjtrNn9yPAPGHdFg3W6Lx1JJLFstwXfACjF4r9clN6lWJad8UUAPwhsQXqMh+vm8eK3VBN8ZT+WyrA0LBVljrfJpags9zMBnAi2eVirm82hEmUyGFosFvUwmZBgGzcfjoYYZYCbOZehLBKzwDsKQo1zOnLqu5HRdpw/XlWYM09lBTQVEW3gDdsMChLSazWhfkUEgw9nCm1n+9TuAwILAPs5mTcP36QA1Ba4xJ5LbSa4RX7FPIFSmB88bMtSduVVqjVEAE8WYuQ8jvthl9GMhxe+QZMAcwlsI93DmN9/RrsP4jVO+aAtX2IKH1tZIR2o3C+NhKJoBae46vcZ/+zd+CjAAN5vaL1x3kMMAAAAASUVORK5CYII=';
// Yusuke Kamiyamane: http://findicons.com/icon/119015/tick
var ICON_OK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAehJREFUeNpi/P//PwMlgImBQsACIhhnCAFZjEAGkANy0B8gwQ00m5kRogpEMYHl5YF4LZBXw/D3/47/Ea/xuOD7PwaGX1AMMvDvfwGGf/8nprkkGQPZLUAVHqR4gY3hH0Ofoby+6ZcvXxjinWL0Gf4wtMC9QAAwAjXXK0jIO8gLyUl9/Pzx98Fjh24AXdOA7gIPoP/PwJwGdvoPoNP/MGQIcwkGq4mrKHz5+uXf0UtH7wBdMRGodgvCgP9ATX/+tyT5JxqCaDAfIu7DwcSWJckjqfzgwQOGU5dP3f3w4cNSoJq5DL//I0Xjn38tMX4xes+ePWOK8IowAPGBmnNZ/jPVS4vLqH7985Xl5YcXDz99+rAJGIDtQAxxIcKA/zVLViy8xM7J9uvU7VPMDnaOOkAb4sVkxTV+sPxgf/fhzdOP797vZ/gLjD4Ghn8oAQRKiYx9/AxADaAwaDF2NtN6+vMZpwCnAMP7b+8Zfrz49vrj3fdHGJgZkhhYmT4wsELTC8iHWe+RAvE/ww6g02vO7jhxjfkv49fXjK8Zvn/5+uHTzXcXgSGeC1TxAWdKRDHk81+Gp5vutnCZ8Mt8v/DpDtCBeUBrnuJNyigAmEQZ3v9h+LbzTQsw+ZYwCLJcBydjXIlkwHMjQIABAIHQ3hY9qLekAAAAAElFTkSuQmCC';
// ajaxload.info
var ICON_LOADING = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
var BUTTON_EDITALL = 'data:image/gif;base64,R0lGODlhSwAdAPcAACQiJOSqZDw6jGSq5FxaXExKTKzm5DQ2NGQ6PDxmrMT%2B%2FPzKjKzKzIw%2BPOTmzDyKxMSKPDw%2BZPzGjDxirIzG%2FERCRGxCROTmrPz%2BzERCjERurOT%2B%2FERGbOSqbGyu5KxmPDw%2BPGQ%2BPDxqrMzKrMzK5IxGROTm5DyKzMyORDw%2BbDQyNDw%2BjGyq5ExOTMzm5Dw6PMz%2B%2FMzKzIxCRPzmzMyKPOTGrIzK%2FERGRGxGRPzmrPz%2B5ERGjPz%2B%2FOSubKxqRGw%2BPERqrOTKrESOzERCbF2iFAADAJGvAHwCAIUgAecAAIEAAHwAAACWAAADABXUAAAAAGABAAMAAAAAAAACANgBEJEAABgAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAAJYAAKsA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIyW%2F%2Bar%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMoADoABUSAAAAAAD0HwArAACDAAB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAMAwChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAMQAAAMBAH8AAAAAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfKIAlgMwq68AAAJ%2BAEPEZDoDZAB%2FgwAAfFIuamVncXBpSGxmACH5BAAAAAAALAAAAABLAB0ABwj%2FAAkQKNCiBcGCCBMqVHhwYcOFECE%2BjNhCIIGCDwlqNMhx40aEHkFi7EgyJMeRIT8OLKCR5Q2DLFGWbFngJcmXLGOmLNnCps2dNGPe0KmzZ86jQokizclxKFOnSZc%2BPWo0qMucUK%2FW1MrVKdSsW4%2BCXQq2rFexWs%2BG3ar2a9q3YYfKjQvXbYWac%2FOyvepWr9%2B9d%2F8K3ju3wN21bfEqlnujMOPFLA8fPjs3sOKwk%2FE23nxjhwIeoEP3GFqB8Q0ODEbguAFkw2jSW0tznq1hA4YShhsXaN2jZu3Xs3NvvpvBxQUcpZNzVo5adePkBX7Lnj2bBWgUtF3fqPCb%2BvLtjYtf%2F7BAXfnmIanJD2etHXxy5RVQkzAx%2Fjn717zd6zdfQbyFCgAGCJ4Qoc0Qwwj%2FtdYBe6HxMNp07xHYgw06%2BADgdrwBqOB%2B7oFQgYf9GfdfgAB6%2BAAPC4DQmg5BJOiahxl6KOOHH25HoQ8nOFhiBRlWIIJrNM4IIon9wdAgaDQAOIQBDsgAYAIb5BACj0BSGQCRWPqXAQwYNBBga1daiWWAQlawgnFTltmaBDKmkNqUUHbgIZQ9lCmkdUmCMAAPKNBIJ4wvBimokGeOZyeUEtAYQWo%2FgPDjlY5uIOegijIpA6BsfvijnJFySikIoIZaKAKhlopoqIuOQGqcoEIZQKmwgv8A5ZE6ONBAq5LiymmsILzQ668CoOnrsL2m%2BoOvwV4Qwguu9noqsdAOoMMHv75w4qvMboBts9D%2BWm2vyZI6LLF7QtCrtEGsqm2vo347bLjVtuuqr%2FO62%2BsBB7yQLwgCfHbkAvnmS0GDOtSAwAETaBtwwqAFELC%2B1vLgMMQC8wABwtrqm3AAFIPw8AsgQxzyyCSXbPLJKKesssgh44uvvi7HLPPMNNds880456zzzjz3fLMKBwAtdNBED2100UgfrXTSTC%2FtNNNERw201PhObXXVWFOt9dVbZ3210VyH7fXYXZctttleq6D22ioAELTbbb8td9x0w2333HfXjffeevckvTYIbAcu%2BOCEF2744YirAGDbADTu%2BOOQRy755JRXbvnjigcEADs%3D';
var BUTTON_UPDATING = 'data:image/gif;base64,R0lGODlhbgAdAPcAACQiJOSqZDQ2hGSq5KxiNOTixDQ2ZDQ2NKzi5GQ6PDxmrMTGxGxCRPzKjMSGNMT%2B%2FIzKzExKTDSGxOT%2BxDRirIQ2NFxaXDw%2BZERCROTmrPz%2B5OTGrDw%2BjIyq5KxqRPzmzMTm5ERurIxCRMyORIzG%2FESOzOSqbGyu5KxiPOTmzDw%2BPGQ%2BPDxqrPzGxMzKrMSKPERGbDyKzPz%2BxIw%2BPDw%2BbOT%2B%2FDQyNDw6jGyq5OTmxDw6ZDw6PKzm5MzKzGxGRMz%2B%2FKzKzExOTDyKxDxirIw6PERGRPzmrERCjMzm5IxGRIzK%2FOSubKxmPGw%2BPERqrOTKrMyKPPz%2BzERCbPz%2B%2FIABEDcAABkAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAADQAAIQA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIw0%2F%2BaE%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMoADoABUSAAAAAAD0HwArAACDAAB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAMAwChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAHQAAAEBAA4AAAAAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfNgANAAwhDYAAAB%2BAEN0ZDoBZAAOgwAAfJguagFncbtpSABmACH5BAAAAAAALAAAAABuAB0ABwj%2FAC1YCEKwIMEIB4MgTGhQYcOHCxc%2BNIhQIsOIFyc2xOhQYsWCFQVa%2BNiRIciTDhN%2BJOlRZUmKKSGaxLgyI8ybB0cqRFhkZ4SKP3%2F65KmwZ0mgQoMS7Yg06MGfPSNETeo0asmpTbMO9Tn0Y5GkQb427arUK9WyPMGm1bp2q1ilDsXGBSuX6luoZe9KVfpWbN%2B8aPX65QuYMNq9eA0HFQz172DEj7%2F%2BRQw5seTKmPcOjmxZc2fMnClf9vwVg2fTm0mrHn259erOrl1Xjv2admmpkm%2BDxi0Z9enVtzfnloo69%2FAIponzxo04ufOfz5HjLUK9uvTi1bNbL45ce2nv3btn%2F78enrvp8%2BAvo%2FfOvj118dpD1FiSHQaCFEm0Y3BfH4gLH%2B3ttx978tHHX3UC6nfggtQliAEGBRYhIAw8pCBCgxJi6GCGEsLgHwMcJpidE%2FNtaGKGGyLIIYosnmjigAMWQaIJHErBQw4iPPighDu%2BuN8FH%2FLooI4YkEhfjzy2KOCQOgrpYotQLqkCBlOqYGSVGFxQ4QwPslDDFGBOEQWXD05ZQpgf9OBCEw8qEeYUS%2Bjo5ZtLWFminW9q4EGZGBzxwJtTjEDloFgWSuihWBJZZA0mECnFfTkuOoURDBzxQxQiTIlBDFM0sKgGTzCAgRCBPojDFAHoSGKqqtbAKomTMv9gYwpkWipDjm5O8YKivPbqq6GrEvoojlMqUAOlxbr6oJa0JmvECjqqMKUU%2FkGrgpcmYGlsnRgYawSbKpw5wpSnjkulm%2BYaqi6ihKprbKNV0rAllSQ2UCUHIGTQxLU12EulDv7tK%2B2mYY5Jr7JVzjjllVRymqoKECyQI7m6srvuxVRKq7EKxgaw8QUIFDCDtB1rDKQLK3Dcr8n%2BJaACBz%2BAaS8EPRBBMqMbv3tzttJyynPEI%2Fcc6MZEF220xjuokPTSxtqbtAoAo5x000vfkK%2FLVEsbdcoDaMCE1jfOMLWrT6vs8Q4dP%2B2w0hHbnPQAui6t9Nxy10033XbvgG8GCez%2F4HfWaB%2Fbt8oN%2BB1133ojwfcObf9dQxRuU73DASpQQLbZfu9AagBvTwFF5m5%2BrnTed5O%2B9OSoH7AD3C9kDjcUlB9gedw7kKABAaiz7nfXGyRwQNdM%2BN3BBAsQoboAV2eetuxkq%2B7w8Yr3bewUDqRuverYX2896pmDDijnqE8%2FRQsxf949CXn2vsMNfxZcfOZDfInqDvGDX3%2Fmm2c%2B%2B5ut76BDhUQwHAAFmIIAds9v2DuAAhfIwAYq0HIBkMAUZFABB1rwghjMYAZT97vbafCDIMQgBENIwhKC0AA8KEAFTXhBGxzAhTB8oQxjCMMR0nCGOLyhDnPIwx3GUADtC5MDg3zYwyLiUIZIdGESFajEJjLxiUuMohOlCMUpWrGKWKTiEmFogytq0YtgzGIYvyjGMpJRil1Mow0A8EI2rrGNcHyjHN1IxzjWcY52zCMe93jHPurRj3vsogrUSMhCGvKQiEykIhfJyEYi8kFrBIAkJ0nJSlrykpjMpCY3yclOetIGGAgIADs%3D';
var BUTTON_EDITALL_MOUSEOVER = 'data:image/gif;base64,R0lGODlhSwAdAPcAABwaHOSmXKReLKTGxCwuXDQ2NOTixCxapKTi5OTipFwqLCwqhGQ2NOTi5MTGpFym5CyCxCwqLMSCLExOTDRirMT%2B%2FDQ2hDQ2ZDw%2BPMTi5PzirIQyNIQ2NPz%2B5OTGpMTG5CQiJPzGhMTGxPz%2BxCxepOTirFwyNDQyhITG%2FDQyNMSKPOT%2B%2FOSqZKxiNKzGxDQyXDw6PPzixKzi5FwuLCwuhGQ6PMTGrGSq5DSGxCwuLMSGNDxirDw6jDw6ZERCRMTm5Iw6POTGrCQmJDRepOTmrPz%2B%2FJEVEnwAAIUfPefhAIE9AHx3AAAAEAAAABUAAAAAAGAA%2BAMA%2BwAA%2FQAAf%2BBvPI4C6RgAEgAAABAXAD8AABkAAAAAAADkIADn6QASEgAAAH4uJgBnLABpkcBmfAAAQwDqOgASXAAARP8gb%2F%2FpY%2F%2BQdf98bf8oAP8Cn%2F%2BRgP98fAD%2FAAD%2FAAD%2FAAD%2FAAAiAAACAACRAAB8AACbmAAB%2FRWRFQB8ACTbAKsB8ACRFQB8AFAAAOcA8BIAFQAAAJ8wCOtG6YEWEnwAAEsAdOPwb4EAcnwAXODIZAJg6VEWEgAAABAY2D%2FomgESgwAAfGzoCADpnwASgAAAfIwk%2F%2Bar%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAmOkA%2FZAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMAADoABUSAAAAAAD0AAArAACDAAB8ABAAAT8AABkAAAAAAAAtRAHq6QASEgAAAAAMAAChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfBCdqD9k%2FxmDgAB8fB5w%2FyK9%2F9dP%2F1oA%2FwWcpQDI%2FwBPgAAAfAAAiAABgQAAQgAAAKuMmCzo%2FdcSFVoAAMgAALoBABUAAAAAABi4LQBk6gCDEgB8AAABZAAAZAAAgwAAfAAAJAAwqwAAAAAAAEM7ZDoAZAAAgwAAfFIuamVncXBpSGxmACH5BAAAAAAALAAAAABLAB0ABwj%2FACdM8IGBoMGCCA8qTMhwocOGBQ0qlAjRh8AJMAgi3KjxIMKMGDhiyNhxZEmRG1NqVBmy5ISCGWP6kAmzJc2ZOEGGrJnToMybP3sGjZlyp9GjK48qNcl0qdOnUItChRGS6lGrV59S3aqUa9SsRrmKzep1Z9mqI9MuPWvVq1u1aWHIjRtXLowCI8XivRt37968dgPvDby17VzAhQcLJszYboHAdRs%2Fljt5cuO7VC1jsExZMmYYFioUGU2aBebKMHoMsMEAxpAVpv12nv348Y4VI4A4hnGbhW3YqGufpszjB5HWwpNj7uHCRo3hBSjAhj5c7o3RKpL3vivd9Ofgdx9b%2F8iQoEaB2o9TfIdxoTny09vTKz%2Ff%2FkMDIuZrd3%2B8H3348OfdNV4JJmCmnnA4kBaDCKxFB5x0pBUR23kUqpcgCyh00MKBDvrWIYf%2FUVhACuedkMFxIo44YoIhONiBBwwU8JqHM55HYooUZtjChSJ2R2KNNqp4440j8iBahEXoQB8CBnAwonQaMJCCdAGkMOUKVVYo5IgW%2FFACA6GNwAGJV%2Fp2ZZVEimhlCjmweYKXJqxpZZuvhbDmC6vFSQJsVu7JwpxyyvlAkm0OqgObKfjZpp%2BAIspmm21aaWICMyAaaQ7ShRApAS44YAKmWLJJ5aWAtvkCkxtYmemcVIqKJamOrv8J6aSfWmplnXPi6WmisC3aq6Ok7olkBwakmsIBfB7LJ6yQ5uCsszSQV2sEj%2BZAwAAOzAAtedruGYCze4ZA7bPk5vBABwKQC0ER3%2BbgLbivlivvswtwW24Ezg4qAZvneqBADsi2Wy%2BlzuJL7sD%2F0sttBO%2B6i6XBBT%2BLbwQUR0DDkRFqWjEKEb74b8AUA7zCaN%2BGTPG6JU8cAccSiBwAxQHnMHHEKsssc80m46zzzTzn3PPOPgddsRAVR0A00UZTjPTSSjed9NNMQ%2B101FRPbfXQTQtx9NZGc61112B%2FLbbXZIdd9thmQ6312my37fbbcMct99x012333XjbDYIQe%2FdLzffffgcO%2BOCCF0744YYbDjgIiSPueOOQPy4545SnwDgAIGCueeacb%2B5556B%2FLnropI%2F%2BOQjnRQDA6qy37vrrsMcu%2B%2By0uy5EAQEBADs%3D';
var BUTTON_MATHRANGE = 'data:image/gif;base64,R0lGODlhdAAdAPcAACQiJOSqZDQ2hFxaXIzKzOTixDQ2ZDQ2NKzi5DxmrGQ6PMSGNGSq5MT%2B%2FGxCRPzKjDyKxExKTDxirKxiPIQ2NIzK%2FERCjOT%2BzERCRKzm%2FIxqrMyObIyq5Pz%2B5OTmrKxqPMTGxDw%2BZMTm5ERurMyOROSqbDw%2BjDw%2BPDxqrGQ%2BPMSKPGyu5IxCRMzKrDyKzERGbIw%2BPPz%2BxOT%2B%2FKxqRDQyNDw6jKzKzOTmzDw6ZDw6PKzm5Gyq5Mz%2B%2FGxGRExOTKxmPIw6PERGjERGRKyu5PzmrMzKzERCbMzm5OSubERqrGw%2BPMyKPOTKrESOzPz%2BzPz%2B%2FKxuRAMAAAAAAAACANABEDQAABkAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAAJMAADoA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIyT%2F%2BY6%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMOQDoUhUSkQAAfAD0kAAr6QCDEgB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAM1AChAABPEwAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAEoAAAUBADoAAAAAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfDYAkwUwOiwAAAB%2BAENKZDoFZAA6gwAAfCIuagRncVRpSABmACH5BAAAAAAALAAAAAB0AB0ABwj%2FAAcM8EGwoI8IBgkiVHiQYcKFCSMWRAgxYkWJFCVq3DiRo8ABGTN2hFiRpMOGDUN2NKjSJEqRDkW2ZDhzZMqDIG9SjBBBiEKePnnyPCjUR9CeBH2mpBjUKFGdRIcqVSp0KNKqC3c61bmz6EysCIVY9fo07NiQYKWmNVtUbNe0Dd1ajXsWrlu6bauKlQtU6F6%2FWPny1bu2Z%2BDDiA2DdSuYsGLHgCErljuYcV%2FDlv9axjz58mbNkTNf9tyZ82fSPf%2Baxgy69erVrmN3li3a9evasGf%2FxcDZMG8hsX%2Bnnq2Yd4Tfp4Gb3quZ%2BXAhyFk%2FV678OE%2FjzIGL3fHkge8XGTpA%2FzkuljcG6OStl%2B%2BJYYQMJMrPa59%2FPAiPJ%2FifIBku33z5%2BOidl55%2FAf5nHXLzJajgCk90MIN2TTT4YIIIaucefOi5VwJ5CiZowREe9CAEgw5q9xuBJrLHIYUqdgjdiy6%2BeB4GDOo3YwUSyjjfjMBhkMR7PQrxI4Yw8shjECJ44AB0ESJhJIU6QvmkiTrKR%2BWTM2KgZY1EOIDBhzKUeGN%2BNmrpHpnw%2FUimg%2F3J%2BCWIXvoowwM84phfCTKqmZ%2BY0NlH5hMkaImBERnk5wQLU2p5gqAYMIAfmxA8OsOiJ0QY6AkMOonBCUNuuqmaD5xghA43wOAppVqaAKeWLnTnaaSXMv9YwqIYoCDDE12GQKqpJ1jAw6EY2Bnolw2w6euhqNLK6Jb5PTDqDUOwySitRtjQQgpa%2FhgAoz%2FSqaWlywr6oZKDhjfDstRaG%2BePRCjxLaBacreEoDiqEC%2BglLY6bLjJcrcBqRrMuUMHH5zKan4xsLBoAu%2BhyjASlEY4q8GLmnDfnpMajEGr%2BDnB648Tn9DqxASAoPCm3F1agbRyhkpxsjQ%2BoQJ3%2BKmwgoOUWoxfqAQU8bEMIdcKdL5PbAvzCap6oATSIC69qc7dndAzr7ZCvGmERk9N9BKL2vknnUefILbYjpLAcAdMKMFABz%2BMvXbboiJQqtgMBzD2CQzPKvbId9%2F%2FnbQCez%2Bh9wlvL6rr3HgPHbjeJSu8aNlilwxD35SLncMJl1%2FOnQo54BhADoVfPvXlDMcABOYMh5p53ZiLXHTmrV8uQJIKXI6D3DDkkMPoiZuOugyfY96q3aA%2FsUTm9WL%2BNuzMx%2B588VzDvrzybGPOwQVFnJ6DCbS3XnfmkRL%2F%2FN%2Bth3956Nf7TDrw4BeNOfceAM6w8es%2F0Lzuzh%2Bgu%2F4HOKoC%2FznoH9v4V4MGkCkGIAAC%2FyRwq6IdgIGf01%2F4AAjA2cWPfzgIzw8OUMADgoACAYRgAHMwwRA2MD8LGGGk%2FpRCCu5PdzCMoQxnSMMa2vCGOMyhDve3vB3CkH8HCKIQwodIxCIa8YhITKISl8hEA%2BigABRgohSnSMUqWlGKAjAgmRZwRRocwItg%2FKIYw0jGMZqxjGg8oxrTyMY1urGNcDSjHL0oxjrS8Y5BxKMd88jHPfpRj4DsYyD%2FKMhCEvKMNBikIg25yEM28pGMjKQjGZnIStIAAF%2FE5CUzyclNelKToOxkKD8pylKS8pSjTKUpVYnKTibyBJaMpSxnScta2vKWuMylLneppUsC4JfADKYwh0nMYhrzmMhMpjKXOUwaYCAgADs%3D';
var BUTTON_MATHRANGE_MOUSEOVER = 'data:image/gif;base64,R0lGODlhdAAdAPcAABwaHOSmXKRaLITGxCwqXOTixDQ2NCxapKTi5FwqLPz%2B5OTipCwqhCyCxMSCLFym5GQ2NMT%2B%2FKTi%2FCwqLPzGjIRepIQqLKxiPDQ2ZExOTDRirDQ2hITG%2FKxiNDw%2BPMTi5PzirKyq5CQiJPzGhKReNKzGxDQyXOT%2BxCxepFwyNOT%2B%2FOTirDQyhDyKxMSGXISm5IQ2NKzm%2FDQyNMTGrIQyNOSqZKReLCwuXDw6PKzi5FwuLCwuhDSGxMSGNGSq5GQ6PKzi%2FCwuLIQuLDw6ZDxirDw6jERCRMTm5CQmJMTGxPz%2BxDRepPz%2B%2FOTmrOTGpAAAAGAA%2BAMA2wAA%2FQAAf8hvPAYC6RsAEgAAAAAXAGcAABUAAAAAAADkIADn6QASEgAAAH4uJgBnLABpkcBmfAAAQwDqOgASXAAARP8gb%2F%2FpY%2F%2BQdf98bf8oAP8Cn%2F%2BRgP98fAD%2FAAD%2FAAD%2FAAD%2FAAAiAAACAACRAAB8AACbmAAB%2FRWRFQB8ADHbADoB8ACRFQB8AFAAAOcA8BIAFQAAAJ9gCOtQ6YEWEnwAAEsAdOPwb4EAcnwAXOBQZAI%2B6VEWEgAAAAAY2GfomgESgwAAfGzoCADpnwASgAAAfIwx%2F%2BY6%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAmOkA%2FZAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMAADoABUSAAAAAAD0AAArAACDAAB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAMAAChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fB5w%2FyK9%2F9dP%2F1oA%2FwWcpQDI%2FwBPgAAAfAAAiAABgQAAQgAAAKuMmCzo%2FdcSFVoAAMgAALoBABUAAAAAABi4LQBk6gCDEgB8AAABZAAAZAAAgwAAfAAAMQAwOgAAAAAAAEM7ZDoAZAAAgwAAfAAuagBncQBpSABmACH5BAAAAAAALAAAAAB0AB0ABwj%2FADNkMOLBCMGDBRMiXKiw4MGFDxVGnMiwosSGFSdi3GjwosAMOAh6SEhSpMmRJ0OOVIlyJMmXImG6PKlQZUyCKlneRKmzZcmVOzPUNBKyKNGjRQviUKr0oNGnSKNCnerUA0umFaku5dn0adOuRF2KHUs2ZUyyaNOqRcsy59m1Lt2mfcvWKty4K8luvctXb9q9S7fu7TsWsF21ge0mTnw4r2DFjiEzXgy5MV7DeC9LjlzZcmQcoB9TBu3BwEocpgOTXkzaqmrXoRWzXpo6tevUoVXbfh1492rUsHOrFm4gdvHiuUsTX46admjkyHNHF04d9PTm1qlPvx59e%2FXu2B8w%2F6EQHUMMBRewQ88OvjkRFTWyNz%2BefUMEJviZxKe%2FXj17%2BfT5h92A8w0YYHE%2BMIFecy0o2EGB%2FM333n6oTRjhhThscMQCP%2BCQ4IIQhojhgSJCOCJ7xYmnnwHFcaDgBSwWGKIG8M1HI4Ux8ndcER%2BsAEFxPKwYoYwkFieDkSTO119zMqDIYpMGJMgECD8YUMQRKijQQZNNuphfDSwaQGN%2BK46ZH3rHGQBlkxt8sAAEFapAHg5dkglmmGbipyWdqBVxH5k9qIkDBkDkpwQMUIap6JMGqKilAUE6GGaQgTa64pFLwKdopkyMYAAGCBSA6KIstumjmkF6yiKlLIp3pwGcgv8AAQY5iFpqBIca4GWl9j1qX65hHqnmsCxKOR6tBYSg5ZHMDotBCTP8KKYKATArA40jyNAkq9o2K4OGp5q3LKPOQgvBkTTKeiS34vUgrIuBypBgpTJQ2uyw3QYhQxAJulBrBSqM4IMCJGirr7aRMqEEDdpmWkO3MqAAn8FB1nDwvt2y8KeeBRvcbcILayvxw9o2oJ%2B%2BAyTB8L7tasvBstrSSEG%2BNF%2FcropMOPAAwQdrjF%2B2KdOgr8TV6hsEjQEcHGS1GGMcBAsb6iADC26m0POfQKus7wHUYry0tkErnbPLZOY3gtEe19xupgo4kcLONmC8c8FBmBAqw0d3ffDIXp%2F%2FnLa%2BVC9gdb1MMB3E3PvaXQDeN4ptsQxBG9xyECkL4XTTTQeh%2BeaH5xyEi0nDvXnlQUwgsRJCaC7xCBPsGwTRm5ucNOeb7%2BCmDprfEGrqlCchROun8w675rJrLp4DpcvgIvKH89y60bRHb7znnItuvAI26PvCCUlYoDkDt2%2FO9exBFC89%2BAvgTnzh12cfxPbdq07tBOvPjj7uElO%2Fur70a94%2F5%2FSbgAAncLzS0Q8JOxNAABmwMYV1L4Bcw08AJjC%2BAMougBgMAvoSEEACSEABAtBgA5XgOwGOz4AXLF3%2ByOSAAZqsbMgTYOlmKMMM1tCGODSgDm%2B4wxzy8Ic%2BDGIP2Ac4wAQK8YYCRMIElLjEJDqxiVBkohSfOMUoUvGKVsxiFbeIRSYKkAChsoAWr%2BhFJSLBjGhcYhrPqMY2svGNa4yjG%2BUIxznasY5wZCAM8UjHJp7xj4AMpCAHSchCGvKQiEykIhfJyEY68pGQjOQfRYAESlqykpi8pCYzyclNerKToPykKENJylGa8oyWPKUqS8nKVbqylbA0pQhmKQIDiAAAt8wlLnepy17y8pe%2BDCYwhynMYhLzmMZMJi5raYAJAOCZ0IymNKdJzWpa85rYzKY2t0lNJBggIAA7';
var BUTTON_OPERATION = 'data:image/gif;base64,R0lGODlhYgAdAPcAACQiJOSqZDw6jFxaXGSq5OTmzExKTDQ2NGQ6PDxmrKzm5MTGxMSKPIw6PPz%2B5PzKjIzKzDyKxDw%2BZDRirKxiPERCRMT%2B%2FIyq5OT%2BzGxCRERurIxCROTmrERGbKxqPOSqbERCjGyu5Dw%2BPGQ%2BPDxqrKzm%2FPzGxMyOROT%2B%2FIzK%2FDyKzDw%2BbPz%2BxDQyNDw%2BjGyq5ExOTDw6PMzm5MzKzMyKPIw%2BPMzKrKzKzDxirKxmPERGRMz%2B%2FIxGRPzmrKxqROSubGw%2BPERqrPz%2B%2FESOzERCbPz%2BzJFpAHwEAIUgAecAAIEAAHwAAACSAAABABVPAAABAGABAAMAAAAAAAACANABECkAABkAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAAKcAAJMA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIyn%2F%2BaT%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMOQDoUhUSkQAAfAD0kAAr6QCDEgB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAM1AChAABPEwAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAIgAAAIBAAwAAAEAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfLYApwAwk2kAAAR%2BAEOIZDoCZAAMgwABfJIuagFncU9pSAFmACH5BAAAAAAALAAAAABiAB0ABwj%2FAAcMgAHDQEGCCA0aRJiQoUOCCxc%2BnNiwYUSHCitK1MhQ4MCNCjcezAhxpMmDJjOqPFmyIsuWGFGCLDjAQEibMm3qLGlAB0%2BTPneuxDkyos2gQncW1OkTBtKmOm%2FizKhjKtOpB6tKNag1ataoO7t%2BLfqVqkqwS7FqLQu2a1Stbru67Xn17dG2YOnetcu37966deHqFXyXMOHBew1fraoYMWLGixNL7gmZLuTLhS1rxsw5s%2BLOVStsHj0adGHRlRmrNoD6MePWOjjHptwT9eXXpUNbxj27N%2BvCsX2nEEJcyInfoisEZx18NmznoaEj161cN%2BQKGlD8YE6ZunXu1ZuL%2F48dBIXx2MMfiEetPLx7HeGDJ08un7n47D%2FiN29vf3wF%2BuPJB58ORChQAA8DVhCCEPkN6KCAsenX3oP7rQefcuX9EKGD7204oX8XJtjef0MwKMJ%2F8IEgAwcZYGhecUVs8N9%2FHZQAo4zwlVecEAEoN1xxDeqgI5AVlPfBhUTYSJx67Q1JnAM%2BVCflfydW8IJxM1aZApQViKBjDxm4sEOM%2F4nJJQhjbnDily3%2BFwGWIiz4QZUkoDBnl0JqdyKaXL75QJdFmgemBAbKeGKVVf63ZZSJKigEA%2F%2BVB2akKPRopXGHqoBloJMCSuV%2FRNxgQ5sZzhjoB%2F9dScOMIXDJKRAkCv%2BxqqmfnrhlDrVeesKJCaDw54kurDhCBYvOWN6vvd6J6H%2BaEldEDV0aeWgFvf5gK5SZCnFnnaie%2BKaygE4rwqIiiHtrtJV2KYIEosL6445CPLBmuoeKIOaSIkCwALRe0ovunPnOUMOh5fXYbwDZWhuuuuWKoOmdMZS7goENlNurvBXEECwHI%2BS7b8Mgi5AsyBUQ4EAO5RJawMAiVwryyB6rWa6mCLcMsMPahlxuxBELICzPLcsbca89jDC0rxGbnAPQEVvsctMHQCDw0UVUHMPFIvDcK8IxECBr1iJ4zcDRXOMcANNgA%2F1m2QJYwILVV5tHQ9a3Zn0x0zEc0HLZSZ%2F%2FnPUFGHys8YoIgL310T0U7jMHhcd9dtZrp511DHlXfoDXO76dtwgH9EqcCTs8ekDlb8I79gETVDr66m1nvkADq6dOXACoV0r6jifHbvvoa69e%2Be%2BUBy%2B88KOnHsCbVQ%2Bv%2FPLMN%2B%2F889ATn%2FcB1Fdv%2FfWdq4799tx37%2F334IcvvvXGj2%2F%2B%2Beh738IB67fP%2Fvvuxw%2F%2F%2FPLXT%2F%2F99ueP%2F%2F72z%2F%2F%2B%2F%2BsDIPUCSMABGlCACCxgAg%2BowAYy8IH0a4EDF0jBCVoQghesIAYxKMEOtgAA7APhB0NIwhGaUIQoLGEKT6jCFrLwhSuMoQtFKEERePCGOMyhDnfIwx768Ic9%2FM8HGAFAxCIa8YhITKISl8jEJjrxiURsQQUCAgA7';
var BUTTON_OPERATION_MOUSEOVER = 'data:image/gif;base64,R0lGODlhYgAdAPcAABwaHOSmXKRaLITGxDQyXOTixDQ2NCxapFwuLKTi5PzGhMTGxFym5Pz%2B5OTipMSCLGQ2NCyCxCwqLCwqhExOTDRirIQqLMT%2B%2FITG%2FKxiNDw%2BPKzi%2FMTGpPzipDQyhCQiJKReNKTGxOT%2BxCxepMTi5ISm5OT%2B%2FMSKPDQyNIQyNOSqZKReLDQ2ZDw6PFwyNKzi5PzGjPzGxGSq5OTirMSGNIQ2NDSGxCwuLCwuhDxirIQuLIzG%2FERCRMTGrPzirDQ2hCQmJKzGxPz%2BxDRepPz%2B%2FAACAJHFAHwBAIUgAecAAIEAAHwAAABsAAABABWXAAABAGASAAMAAAAAAAACAJgBEFEAABsAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAmAAA%2FRUAFQAAAOoAAH0A8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIzq%2F%2BZ9%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAmOkA%2FZAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMOQDoUhUSkQAAfAD0kAAr6QCDEgB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAM1AChAABPEwAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2F6CcpdTI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMmADo%2FQASFQAAAP4AAAEBACwAAAEAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfCwA6gIwfcUAAAF%2BAEP%2BZDoBZAAsgwABfGwuagFncZdpSAFmACH5BAAAAAAALAAAAABiAB0ABwj%2FAClQ4KGBB0GDBQseJJjwoMKHDSM6nChR4sKGFCdmrEhQIIUWDBNqECnSIMiRIRmaVIlSw8mIJRO%2BFDmTJUyCJ1%2Fa5EFBIsifPIC2GIlyaNCjRIsWPHlwqFCcSycCbfjU5VKlTa9qTcq168icIbviDJt0JlGzXtOeZahz7dexX60OVUv3bFyuc%2Bd21XuXr9y9XvX6tQs4r9W%2Ff53ejWvYrmLGix9D5iv58GHJLTJrdqlZcWarBuR2dtoiNGnSpjlnTr259ejEpUWzju3adGcNBkavHpp7c%2B%2FOv3cL1xycuHHeuksPRw48efHc0DPvIEKdyAnhvbMr1668e3ft3H%2BL%2Fy9dwYQK7Oi%2F7w6%2FvUUOE9ZzT1fQPrr99fXz39%2F%2FXsV%2B%2FQDe115p0LHwQgE1tIBCZgwQcZ6A4EWnngESQlhfeQ%2Fmh0KE%2BdWX24IULrigDQ4SSOEPJMwAAYXlVUeEECmUtiALG1QnRA0gtlidCgtOtyOFBuhInX8YUtgCjdXBAF2Q8FXXQAYKmghkiDIQQcOUFGLwJIVDwOcDBD9ccOOJF2wZ5phMEvElkCTSoGCD%2FnFp3pRd8mhAmFuSqACQLX5JQAIIYmnAhhsaoGUGKBA6aJU0JFrelxtimCijhLbpqAkdQJDooJxuyEIQPWjKZACbolAkCg02OmkDIAxaXgcujP9opaKEJnoDClqCkOiuqM6KwggmKGCrByQ4EGuuu5Yn7K%2Fm8XproiRSB2OidfIKrAq3IptoBA7eekCzKNxAIra8hmsuCjs0sIKt5mopQLgYPktAEBzE6qOLRAh7Q3kB3PqsBxdQJ%2BwAC6RwK7Ck%2BstvogSnYG6XpJpqQr%2FQEhGxv86iwG3Cu%2F5ZgMPM6osCDsW6cAPBOuyKMbM8PnsDA6yG67HD%2B0587rctN%2Fwst%2BRea%2B64Ltt6w9A3kGws0TcAqwDRwPqAgAQhDw0zCEiHOzTCSJ%2B8gA43SACsEFwnHSzUV08sNREPWN3gA2X3O%2FTGWcd9A9woSICDmGHf8C3adWv%2FuULZS9ed9bduEw3z3yiUIMICFgw9QbEIMD2xBGJ3ELnRkett9tsWx025BKCD3qCLQljwuebUxRDwA59LwC2%2BrGseAOhd2x2wjYzXDix1sxNe%2B%2BvUqUs74aFvTPvpx9eu%2FPGhE84t2K0vHz3z0ldP%2FfXTZ29966ADIYH333cvfvjhE08%2B%2BOiPn%2F756rfP%2Fvvrx98%2B%2BOED4b3939%2Bv%2F%2FeE4%2B%2F%2F%2Fv%2FLnwADSEAAGnCAByxg%2FfJnvwY68IEQjKAEJ0jBClrwghjMoAY3yMEOQvADQAChCENIwhGasIQoPKEKU8jCFbqwhTAcYQlfSMMY2rCGOLyhDj%2FAQx4a4AMAAKIQMYNIxCEasYhIPKISk8jEJTqxiVA04gcoJAEAWPGKWMyiFrfIxS568YtgDOMVgWCAgAAAOw%3D%3D';


getCollageID();

// preference for always showing checkboxes on manage page
GM_registerMenuCommand("What.CD :: Collage Building Helper - MathRange checkboxes", function() {
	var checkBoxQuestion;
	for (var zz=1;zz<=3 && isNaN(checkBoxQuestion);zz++) {
		checkBoxQuestion = prompt("Do you want the checkboxes to always appear on the manage collage page?\nType \"1\" for yes and \"0\" for no.\nCurrent selection is: " + GM_getValue("checkBoxAlwaysOn", "0") + " (0 is default)");
		if (checkBoxQuestion != null && checkBoxQuestion != '') {
			checkBoxQuestion = parseInt(checkBoxQuestion);
			if (isNaN(checkBoxQuestion)) { 
				if (zz==3) { alert("Try harder!  Better luck next time!"); }
				else { alert("Please pick \"1\" or \"0\" (no quotes)"); }
			}
			else if (checkBoxQuestion == 0 || checkBoxQuestion == 1){
				GM_setValue("checkBoxAlwaysOn", checkBoxQuestion);
			}
			else { alert("Please pick \"1\" or \"0\" (no quotes)"); }
		}
	}
});

/*/ reset authkey
GM_registerMenuCommand("What.CD :: Collage Building Helper - Reset authkey", function() {
	var temp = findAuthKey();
	alert("authkey set to: " + temp);
	GM_setValue("authkey", temp);
});*/

// putting the "C" image on various pages (with an active collage)
if (fullActiveURL.match(/(torrents|artist)\.php/) && (collageID != 0))
{
	var lx;

    var match = /torrents\.php\?([^&]*?&)??id=(\d+)/.exec(fullActiveURL);
    if(match != null) {
        //torrent group page
        var title = document.getElementById('content').getElementsByTagName('h2')[0];
        title.insertBefore(document.createTextNode(' '), null);
        title.insertBefore(createAddIcon(site_base_url + '/torrents.php?id='+match[2]), null);
    } else {
        if (fullActiveURL.match(/torrents\.php\?(.+&)?(type|action=notify)/)) {
            // user uploaded/snatched/etc and notifications
            lx = document.getElementById('content').getElementsByTagName('a');
        }

        else if (fullActiveURL.match(/artist\.php/)) {
            // artist page
            lx = document.getElementById('discog_table').getElementsByTagName('a');
        }

        else {
            //search page
            lx = document.getElementById('torrent_table').getElementsByTagName('a');
        }

        var curTorrID = '0';
        for (var i =0; i<lx.length; ++i) {
            match = /torrents\.php\?id=(\d+)/.exec(lx[i].href);
       		if (match != null && match[1] != curTorrID) {
                lx[i].parentNode.insertBefore(document.createTextNode(' '), lx[i].parentNode.firstChild);
                lx[i].parentNode.insertBefore(createAddIcon(lx[i].href), lx[i].parentNode.firstChild);
                curTorrID = match[1];
       		}
       	}
	}
}
else if (fullActiveURL.match(/collage/) && !fullActiveURL.match(/manage/))
{
	var activeCollURL;
	
	// Getting collage # case when you click on an image from the collage
	if (fullActiveURL.match(/group/)) {
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('=')+1, fullActiveURL.indexOf('#'));
	}
	// Getting the collage #...standard case
	else if (fullActiveURL.match(/php\?id\=/)) {
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('=')+1, fullActiveURL.length);
	}
	// handle collage # case when you are in the edit description menu
	else if (fullActiveURL.match(/edit/)){
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('id=')+3, fullActiveURL.length);
	}
	/* handle collage # case when you are in the manage torrents menu, currently messing up remove/edit buttons, so just skip all manage pages
	else if (fullActiveURL.match(/manage/)){
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('id=')+3, fullActiveURL.length);
	}*/

	var cx = document.getElementsByTagName('h2')[0];

	var collageLink = document.createElement("a");
	collageLink.href = "JavaScript:void(0);";
	collageLink.textContent = "Make This Active Collage! ";

	var removeActColl = document.createElement("a");
	removeActColl.href = "JavaScript:void(0);";
	removeActColl.textContent = "Remove Active Collage!";	
	
	// if there is an active collage & the active collage is different than current page, use name + link
	if (collageID != 0 && collageID != activeCollURL) {
		cx.parentNode.innerHTML = "\<h3\>Active Collage Is: \<a href\=\"" + site_base_url + "\/collages.php\?id\=" + collageID + "\"\>" + collName + "\<\/a\>" + cx.parentNode.innerHTML;
	}
	// else just display name
	else {
		cx.parentNode.innerHTML = "\<h3\>Active Collage Is: " + collName + cx.parentNode.innerHTML;
	}
	
	var jx = document.getElementsByTagName('h2')[0];

	//use something different than cx maybe?
	// display "Make This Active Collage!"
	if (collageID != activeCollURL && !fullActiveURL.match(fullActiveURL) && !fullActiveURL.match(/page/) && !fullActiveURL.match(/search/)) {
		//standard torrent pages
		if (fullActiveURL.match(/php\?id\=/)) {
			collageLink.setAttribute('collage-url', activeCollURL);
			collageLink.setAttribute('collage-name', jx.innerHTML);
			collageLink.addEventListener("click", setCollageID, false);
			jx.parentNode.insertBefore(collageLink, jx);
		}
		//special case on manage and edit pages
		else if (fullActiveURL.match(/manage/) || fullActiveURL.match(/edit/)) {
			//note: problem retrieving name on these pages for collageID!=activeCollURL
			if (collageID == 0) {
				var cxSpecial = document.getElementById('content').getElementsByTagName('a');
				var match;
				
				for (var z =0; z<cxSpecial.length; z++) {						
					if (fullActiveURL.match(/disablegrouping=1/))
					{
						match = cxSpecial[z].href.match(/torrents\.php\?id=([0-9]+)/);
					} else {
						match = cxSpecial[z].href.match(/collages\.php\?id=([0-9]+)$/);
					}
					if (match) {
						collageLink.setAttribute('collage-url', activeCollURL);
						collageLink.setAttribute('collage-name', cxSpecial[z].innerHTML);
						collageLink.addEventListener("click", setCollageID, false);
						jx.parentNode.insertBefore(collageLink, jx);
					}
				}
			}
		}
	}

	// display "Remove Active Collage"
	if (collageID != 0) {
		removeActColl.setAttribute('collage-url', "0");
		removeActColl.setAttribute('collage-name', "None");
		removeActColl.addEventListener("click", setCollageID, false);
		jx.parentNode.insertBefore(removeActColl, jx);
	}

}
else if(fullActiveURL.match(/manage/))
{
    manageStuff();
}

function createAddIcon(torrent_url) {
    var res = document.createElement('img');
    res.src = ICON_ADD;
    res.setAttribute('torrent-url', torrent_url);
    res.title = 'Add to collage "'+collName+'"...';
    res.addEventListener('click', image_click, false);
    return res;
}

function manageStuff() {
	var authKey = findAuthKey();
	
	var activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('id=')+3, fullActiveURL.length);
	//alert("no bugs");
	var allGroupNumbers=new Array();
	var allNewSortNumbers=new Array();
	var allOrigSortNumbers=new Array();
	var isUpdated = 0;	

	//get initial group numbers
	var jx = document.getElementsByName('groupid');
	for (var i=0;i< jx.length; i++) {
		allGroupNumbers[i]=parseInt(jx[i].value); 
	}
	
	//get initial group sort numbers
	var kx = document.getElementsByName('sort');
	for (var i=0; i< kx.length; i++) {
		allOrigSortNumbers[i]=parseInt(kx[i].value);
	}
	
	var editAllButton = document.createElement('img');
	editAllButton.src = BUTTON_EDITALL;
	
	var zx = document.getElementById('content').getElementsByTagName('h2')[0];
	zx.parentNode.insertBefore(editAllButton, zx);
	//document.body.insertBefore(editAllButton, document.body.nextSibling); 

	editAllButton.addEventListener("mouseover", function() { 
		if (isUpdated == 0) {
			editAllButton.src = BUTTON_EDITALL_MOUSEOVER;
		}
		else { editAllButton.src = BUTTON_UPDATING; }
	}, false);
	editAllButton.addEventListener("mouseout", function() {
		if (isUpdated == 0) { editAllButton.src = BUTTON_EDITALL; }
		else { editAllButton.src = BUTTON_UPDATING; }
	}, false);
	
	//edit all button
	editAllButton.addEventListener("click", function(){
		var mx = document.getElementsByName('sort');
		var counter = 0;
		var i = 0;
		isUpdated = 1;
		editAllButton.src = BUTTON_UPDATING;
		
		for (i =0; i< mx.length; i++) {
			allNewSortNumbers[i]=parseInt(mx[i].value);
			
			//only update new numbers
			if (allNewSortNumbers[i] != allOrigSortNumbers[i]) {
				//counter++;
				GM_xmlhttpRequest({
					method: "POST",
					url: site_base_url + "/collages.php",
					data: "action=manage_handle&auth=" + authKey + "&collageid=" + activeCollURL + "&groupid=" + allGroupNumbers[i] + "&sort=" + allNewSortNumbers[i],
					headers: { "Content-Type" : "application/x-www-form-urlencoded" },
					//I can't figure out a way to error check this page...
					onload: function(e) { 
						if (e.responseText.match(/Invalid authorization key/)) {
							//('Invalid authorization key.  Refresh the page and try again!\nI strongly recommend rechecking your values.  Sorry :(');//Invalid authorization key. Go back, refresh, and try again.
							var temp = document.getElementById('content');
							temp.innerHTML = "Invalid authorization key (the system must have updated your authkey since you loaded the page).  Refresh the page and try again!<br>I strongly recommend rechecking your values, since it's possible (though unlikely) that some values updated while others didn't.  Sorry :(";
						}
					},
					onerror: function(e) { 
						alert("some sort of error occured with the server.  Error occured with torrentID: \"" + allGroupNumbers[i] + "\" which had a new sort number of: \"" + allNewSortNumbers[i] + "\".  Recommend rechecking your values."); 
						return;
					}
				});
			}
		}
		// one more worthless request to reload the page after all previous requests finish
		GM_xmlhttpRequest({
			method: "POST",
			url: site_base_url + "/collages.php",
			data: "action=manage_handle&auth=" + authKey + "&collageid=" + activeCollURL + "&groupid=" + allGroupNumbers[i] + "&sort=" + allNewSortNumbers[i],
			headers: { "Content-Type" : "application/x-www-form-urlencoded" },
			onload: function(e) { 
				if (e.responseText.match(/Invalid authorization key/)) {
					//('Invalid authorization key.  Refresh the page and try again!\nI strongly recommend rechecking your values.  Sorry :(');//Invalid authorization key. Go back, refresh, and try again.
					var temp = document.getElementById('content');
					temp.innerHTML = "Invalid authorization key (the system must have updated your authkey since you loaded the page).  Refresh the page and try again!<br>I strongly recommend rechecking your values, since it's possible (though unlikely) that some values updated while others didn't.  Sorry :(";
				}
				else {
					document.location.href = document.location.href; 
				}
			}
		});
		//document.location.href = document.location.href;
		//if (counter == 0) { alert("You have not changed any values."); }
	}, false);
	
	//insert blank space between edit all image and math range image
	var oNewP = document.createElement("b");
	var oText = document.createTextNode(" ");
	oNewP.appendChild(oText);
	var beforeMe = document.getElementsByTagName('h2')[0];
	beforeMe.parentNode.insertBefore(oNewP, beforeMe);
	
	if (GM_getValue("checkBoxAlwaysOn", "0") == 0) {
		var mathRangeButton = document.createElement('img');
		var mathRangeClickOnce; // used so I can remove the image after it's been clicked once
		var mathRangeSRC = BUTTON_MATHRANGE;
		mathRangeButton.src = mathRangeSRC;
		mathRangeButton.addEventListener("mouseover", function() { 
			if (mathRangeClickOnce != 1) {
				mathRangeButton.src = BUTTON_MATHRANGE_MOUSEOVER;
			}
		}, false);
		mathRangeButton.addEventListener("mouseout", function() { 
			if (mathRangeClickOnce != 1) {
				mathRangeButton.src = mathRangeSRC;
			}
		}, false);
		
		mathRangeButton.addEventListener("click", function(){
			mathArray();
			mathRangeClickOnce = 1;
            mathRangeButton.style.display = 'none';
		}, false);
		
		var bx = document.getElementById('content').getElementsByTagName('h2')[0];
		bx.parentNode.insertBefore(mathRangeButton, bx);
	}
	else { mathArray(); }
}

// used for operations on manage page
function mathArray() {
	// math Array checkboxes
	var box=new Array();
	var lx = document.getElementsByName('sort');
	
	for (var i =0; i< lx.length; i++) {
		box[i] = document.createElement("input");
		box[i].type="checkbox";
		box[i].setAttribute('realChecked', "0");
		box[i].setAttribute('arrayValue', i);
		lx[i].parentNode.insertBefore(box[i], lx[i]);
		
		//check for max of two boxes
		box[i].addEventListener("click", function() {
			var unclickCheck = 0;
			if (this.checked == true) { this.setAttribute('realChecked', "1"); }
			// if you unselect the box do the following:
			else  { 
				this.setAttribute('realChecked', "0"); 
				for (var m =0; m< lx.length; m++) {
					if (box[m].getAttribute('realChecked') != "1") {
						box[m].checked = false;
						box[m].disabled = false;
					}
				}
			}
			var counter = 0;
						
			var firstValue, secondValue, thirdValue;
			for (var z=0; z< lx.length; z++) {
				if (box[z].getAttribute('realChecked') == "1") { 
					counter++;
					if (counter == 1) {
						firstValue = parseInt(z);
					}
					else if (counter == 2) {
						secondValue = parseInt(z);
					}
					else if (counter == 3) {
						thirdValue = parseInt(z);
					}
				}
			}
			if (counter == 2) {
				//visibly show which boxes you checked
				for (var x = firstValue+1; x <= secondValue-1; x++) {
					box[x].checked = true;
					box[x].disabled = true;
				}
			}
			else if (counter == 3) {
				alert("You can only select TWO check boxes.  One for the top of your range, one for the bottom of your range.  Unselecting the checkbox.");
				// if you select below the current range
				if  (this.getAttribute('arrayValue') > secondValue) { 
					for (var x = firstValue+1; x <= secondValue+1; x++) {
						box[x].checked = false;
						box[x].disabled = false;
						box[x].setAttribute('realChecked', "0");
					}
					//uncheck current selection
					box[thirdValue].checked = false;
					box[thirdValue].setAttribute('realChecked', "0");

				}
				// if you select above the current range
				else if (this.getAttribute('arrayValue') < secondValue) {
					for (var y = secondValue; y <= thirdValue-1; y++) {
						
						box[y].checked = false;
						box[y].disabled = false;
						box[y].setAttribute('realChecked', "0");
					}
					//uncheck current selection
					box[firstValue].checked = false;
					box[firstValue].setAttribute('realChecked', "0");
				}
			}
		}, false);
	}
	
	//execute the math range button
	var operationImage = document.createElement('img');
	operationImage.src = BUTTON_OPERATION;
	
	var yx = document.getElementById('content').getElementsByTagName('h2')[0];
	yx.parentNode.insertBefore(operationImage, yx);
	//yx.appendChild(operationImage);

	operationImage.addEventListener("mouseover", function() { 
		operationImage.src = BUTTON_OPERATION_MOUSEOVER;
	}, false);
	operationImage.addEventListener("mouseout", function() { 
			operationImage.src = BUTTON_OPERATION;
	}, false);
	
	operationImage.addEventListener("click", function(e){
		var upperRangeValue, lowerRangeValue;
		
		var counter = 0;
		// check if they have two check boxes
		for (var q =0; q< lx.length; q++) {
			if (box[q].getAttribute('realChecked') == "1"){ 
				counter++;
				if (counter == 1) { upperRangeValue = parseInt(q); } 
				else if (counter == 2) { lowerRangeValue = parseInt(q); }	
			}
		}
		if (counter == 1) { alert("You must select two checkboxes to include your entire range.\nExample- select the 3rd checkbox and 6th checkbox to perform a math operation on torrents 3, 4, 5, 6\nAnother option is to select NO checkboxes.  When you perform an operation, it will perform on ALL torrents.\nRemember: click edit all to update the changes."); }
		
		// We are ready to do the math operations
		else {
			var userOperationMessage = "What operation do you want to perform:\nadd: +\nsubtract: -\nmultiply: *\ndivide: \/\nreverse: r\nsort by year: y\nsort alphabetically (by artist, album): a\nsort alphabetically (by album): b\nfind missing torrents: m\nexport to tab delimitted file: e\n\nRemember: click edit all to update the changes.";
			if (counter == 0) {				
				// check all the boxes so you can see you're doing stuff on everything
				for (var c =0; c< lx.length; c++) {
					box[c].checked = true;
					box[c].disabled = true;
				}
				
				upperRangeValue = 0;
				//for (var j in lx) { ;}
				//lowerRangeValue = parseInt(j);
				lowerRangeValue = parseInt(c);

				var userOperation = prompt("Now performing an operation on ALL elements.\n\n" + userOperationMessage);
			}
			else {
				var userOperation = prompt(userOperationMessage);
			}
			
			if (userOperation != null && userOperation != '') {
				userOperation = userOperation.toUpperCase();
				if (userOperation == "+" || userOperation == "-" || userOperation == "*" || userOperation == "\/") {
				
					var adjustValue = prompt("Current operation: \"" + userOperation + "\".  Input an integer to adjust the selected range by the operation.");
					if (adjustValue != null && adjustValue != '') {
						adjustValue = parseInt(adjustValue);
						
						if (isNaN(adjustValue)) { 
							alert("Please pick a valid integer!"); 
							return;
						}
					}
					else { return; }
				}
				else if (userOperation == "R") {
				}
				else if (userOperation == "Y") {
				}
				else if (userOperation == "A" || userOperation == "B") {
				}
				else if (userOperation == "M") {
					var diffValue = prompt("Current operation: \"Find Missing Torrents\".  Input the difference of sort numbers.\nExample: Input 10 if the collage sort numbers are 10, 20, 30, ...");
					if (diffValue != null && diffValue != '') {
						diffValue = parseInt(diffValue);
						if (isNaN(diffValue)) { 
							alert("Please pick a valid integer!"); 
							return;
						}
					}
					else { return; }
				}
				else if (userOperation == "E") {
				}
				else { 
					// uncheck all the boxes assuming the user never selecting any
					if (counter == 0) {					
						for (var c =0; c< lx.length; c++) {
							if (c >= upperRangeValue && c <= lowerRangeValue) {
								box[c].checked = false;
								box[c].disabled = false;
							}	
						}
					}
					alert("Please select only the following characters \"+\", \"-\", \"*\", \"\/\", \"r\", \"y\", \"a\", \"b\", \"m\" (no quotes)");
					return; 
				}
			}
			// user hits cancel
			else { 
				// uncheck all the boxes assuming the user never selecting any
				if (counter == 0) {
					for (var c =0; c< lx.length; c++) {
						if (c >= upperRangeValue && c <= lowerRangeValue) {
							box[c].checked = false;
							box[c].disabled = false;
						}	
					}
				}
				return; 
			}
						
			var allNewSortNumbers=new Array();
			// update the numbers in the range
			if (userOperation == "+") {
				for (var b =0; b< lx.length; b++) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) + adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			}
			else if (userOperation == "-") {
				for (var b =0; b< lx.length; b++) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) - adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			}
			else if (userOperation == "*") {
				for (var b =0; b< lx.length; b++) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) * adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}			
			}
			else if (userOperation == "\/") {
				for (var b =0; b< lx.length; b++) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) / adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			}
			else if (userOperation == "Y") {
				var items = document.getElementsByTagName("tr");
				var years = new Array();
				var year;
				
				for (var i=1; i<items.length; i++) { //Starts at one to skip the heading
					var info = items[i].getElementsByTagName("td");
					year = info[1].innerHTML;
					year = year.split("[");
					
					// check for no year listed
					if (year.length == 1) { year = 99999; }
					else {
						year = parseInt(year[year.length-1].split("]")[0]);
						if (isNaN(parseInt(year))) { year = 99999; }					
					}
					years.push(year);
				}

				for (var i =0; i< lx.length; i++) {
					if (i >= upperRangeValue && i <= lowerRangeValue) {
							lx[i].value = years[i];
						}
						else if (years[i] == undefined) { alert("oops"); }
				}
			}
			
			//sort alphabetically
			else if (userOperation == "A" || userOperation == "B") {				
				var items = document.getElementById("content").getElementsByTagName("a");
				var names = new Array();
				var artist, album;
				var artistMatch, artistMatchSecond, albumMatch;
				var combined;

				for (var i =0; i< items.length; i++) { 
					albumMatch = items[i].href.match(/torrents\.php\?id=([0-9]+)$/);
					if (albumMatch) { 
						album = items[i].innerHTML;
						artistMatch = items[i-1].href.match(/artist\.php\?id=([0-9]+)$/);
						
						if (artistMatch) { 
							artist = items[i-1].innerHTML; 
							//check for 2 artists (eg. "Billy Bragg" and "Wilco" - "Mermaid Avenue")
							artistMatchSecond = items[i-2].href.match(/artist\.php\?id=([0-9]+)$/);
							if (artistMatchSecond) { artist = items[i-2].innerHTML + " and " + artist; }
							// sort by artist - album
							if (userOperation == "A" ) { combined = artist + " - " + album; }
							// sort by album - artist
							else {combined = album + " - " + artist; }
						}
						// case for no artist found (ie pdf, audiobook, Various Artists etc)
						else { 
							combined = album; 
							
							// super ugly way to handle Various Artists for sort by artist (if anyone has a better idea, I'm all ears :)
							if (userOperation == "A") {
								var itemsx = document.getElementById("content").getElementsByTagName("tr");
								outerLoop: for (var z =0; z< itemsx.length; z++) {
									var itemsInnerHTML = itemsx[z].innerHTML
									var match = itemsInnerHTML.match(/torrents\.php/);
									if (match) { 
										if (itemsx[z].innerHTML.match(/Various Artists/)) { 
											var tempAlbumCheck = itemsInnerHTML.substring(itemsInnerHTML.indexOf("Torrent\">")+9, itemsInnerHTML.indexOf("</a>"));
											if (album == tempAlbumCheck) {
												//handle case for a, an, the
												album = album.toLowerCase();
												if (album.substr(0,2) == "a ") { album = album.slice(2); }
												else if (album.substr(0,3) == "an ") { album = album.slice(3); }
												else if (album.substr(0,4) == "the ") { album = album.slice(4); }
												
												//put at end of sort list
												combined = "ééééé - " + album;
												break outerLoop;
											}
										}
									}
								}
							}
						}

						combined = combined.toLowerCase();
						
						//handle case for a, an, the
						if (combined.substr(0,2) == "a ") { combined = combined.slice(2); }
						else if (combined.substr(0,3) == "an ") { combined = combined.slice(3); }
						else if (combined.substr(0,4) == "the ") { combined = combined.slice(4); }
						
						names.push(combined); 
					}
				}
				var namesSorted = names.slice(upperRangeValue, lowerRangeValue+1);
				namesSorted.sort();
				
				var counter = 0;
				var counterRate = 10;
				if (upperRangeValue != 0) {
					counter = parseInt(lx[upperRangeValue-1].value);
					counterRate = prompt("Enter the difference in between each torrent sort number\neg. 10 if torrents are 10,20,30,.. or 1 if torrents are 1,2,3,..");
					if (counterRate != null && counterRate != '') {
						counterRate = parseInt(counterRate);
						if (isNaN(counterRate)) { alert("Please pick a valid number!"); return;}
						else {  }
					}
				}
			
				for (var i =0; i< namesSorted.length; i++) {
					innerLoop: for (var j =0; j< names.length; j++) {
						if (namesSorted[i] == names[j]) {
							counter += counterRate;
							lx[j].value = counter;
							break innerLoop;
						}
					
					}
				}
			}
			
			//reverse the numbers
			else if (userOperation == "R") { 
				var tempReverseNum=new Array();
				var theCount = 0;
				for (var b =0; b< lx.length; b++) {
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						tempReverseNum[theCount] = parseInt(lx[b].value);
						theCount++;
					}				
				}
				tempReverseNum.reverse();
				var px = document.getElementsByName('sort');
				theCount = 0;
				for (var b =0; b< px.length; b++) {
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						//alert(tempReverseNum[b]);
						px[b].value = tempReverseNum[theCount];
						theCount++;
					}
				}
			}
			
			//find missing numbers
			else if (userOperation == "M") {
				/*var nextNumber;
				var zzb = document.getElementsByName('sort');
				var firstNumber;
				var lastNumber = parseInt(zzb[lowerRangeValue].value);
				var missingValues=new Array();
				var extraValues=new Array();
				var isAMatch;
				var missingCount = -1;
				var checkNumber;
				for (var i = upperRangeValue; i < lowerRangeValue; i++) {
					isAMatch = 0;
					var tempCount = 0;
					firstNumber = parseInt(zzb[i].value);
					//alert("M");
					for (checkNumber = firstNumber; checkNumber < lastNumber; checkNumber += diffValue) {
						if (checkNumber != parseInt(zzb[tempCount].value)) { 
							//alert("L");
							isAMatch = checkNumber;
							missingCount++;
							//break;
						}
						tempCount++;
					}
					if (isAMatch != 0) { 
						missingValues[missingCount] = isAMatch;
					}
					//firstNumber += diffValue;

				}
				alert("LPL" + missingValues);*/
			
			
				
				var missingValues=new Array();
				var extraValues=new Array();
				var missingCount = 0;
				var extraCount = 0;
				var zzb = document.getElementsByName('sort');
				//var zzb = document.getElementById('content').getElementsByTagName('a');
				//alert(upperRangeValue);
				var checkNumber = parseInt(zzb[upperRangeValue].value);
				//alert(checkNumber);
				//var lastValue = parseInt(zzb[lowerRangeValue]);
				var nextNumber =0;
				for (var i = upperRangeValue; i < lowerRangeValue-1; i++) {
					//checkNumber = checkNumber + diffValue;
					checkNumber += diffValue;
					
					nextNumber = parseInt(zzb[i + 1].value);
					//alert(checkNumber + " " + nextNumber);

					if (checkNumber != nextNumber) {
						//alert(checkNumber + " " + nextNumber);
						if (checkNumber < nextNumber) {
							i--;
							if (checkNumber != missingValues[missingCount-1]) {
								missingValues[missingCount] = checkNumber;
								missingCount++;
							}
						}
						else {
							extraValues[extraCount] = nextNumber;
							extraCount++;
							if (checkNumber != missingValues[missingCount-1]) {
								missingValues[missingCount] = checkNumber;
								missingCount++;
								checkNumber -= diffValue;
							}
						}
					}
					else {
						
						//var lolCount = missingCount - 1;
						//while (lolCount > 0) {
						//	if (checkNumber == missingValues[lolCount-1]) {
						//		missingCount--;
						//		missingValues.pop();
						//		alert("Hey");
						//	}
						//	else { break; }
						//}
						
						if (checkNumber == missingValues[missingCount-1]) {
								missingCount--;
								missingValues.pop();
						}
						
						//for (var lolCount = (missingCount - 1); checkNumber == missingValues[lolCount]; lolCount--) {
						//	if (checkNumber == missingValues[lolCount]) {
						//		missingCount--;
						//		missingValues.pop();
						//		alert("hey");
						//	}
						//	else { break; }
						//}
						else if (checkNumber == extraValues[extraCount-1]) {
							//i--;
						}
					}
				}
				if (missingCount == 0) { 
					if (extraCount == 0) {
						alert("No missing sort numbers.\nAlso, no extra sort numbers tucked inbetween.");
					}
					else {
						alert("No missing sort numbers.\nBut the extra sort numbers are: " + extraValues);
					}	
				}
				else {
					if (extraCount == 0) {
						alert("The missing sort numbers are: " + missingValues + "\nAlso, no extra sort numbers tucked inbetween.");
					}
					else { 
						alert("The missing sort numbers are: " + missingValues + "\nAnd the extra sort numbers are: " + extraValues);
					}
				}
			}
			else if (userOperation == "E") {
				var items = document.getElementById("content").getElementsByTagName("a");
				var names = new Array();
				var artist, album;
				var artistMatch, artistMatchSecond, albumMatch;
				var combined;

				for (var i=0; i< items.length; i++) { 
					albumMatch = items[i].href.match(/torrents\.php\?id=([0-9]+)$/);
					if (albumMatch) {
						album = items[i].innerHTML;
						artistMatch = items[i-1].href.match(/artist\.php\?id=([0-9]+)$/);
						
						if (artistMatch) { 
							artist = items[i-1].innerHTML; 
							//check for 2 artists (eg. "Billy Bragg" and "Wilco" - "Mermaid Avenue")
							artistMatchSecond = items[i-2].href.match(/artist\.php\?id=([0-9]+)$/);
							if (artistMatchSecond) { artist = items[i-2].innerHTML + " and " + artist; }
							// sort by artist - album
							if (userOperation == "E" ) { combined = "\"" + artist + "\",\"" + album+  "\""; }
							// sort by album - artist
							else {combined = "\"" + album + "\",\"" + artist + "\""; }
						}
						// case for no artist found (ie pdf, audiobook, Various Artists etc)
						else { 
							combined = ",\"" + album + "\""; 
							
							// super ugly way to handle Various Artists for sort by artist (if anyone has a better idea, I'm all ears :)
							var itemsx = document.getElementById("content").getElementsByTagName("tr");
							outerLoop: for (var z =0; z< itemsx.length; z++) {
								var itemsInnerHTML = itemsx[z].innerHTML
								var match = itemsInnerHTML.match(/torrents\.php/);
								if (match) { 
									if (itemsx[z].innerHTML.match(/Various Artists/)) { 
										var tempAlbumCheck = itemsInnerHTML.substring(itemsInnerHTML.indexOf("Torrent\">")+9, itemsInnerHTML.indexOf("</a>"));
										if (album == tempAlbumCheck) {
											/*handle case for a, an, the
											album = album.toLowerCase();
											if (album.substr(0,2) == "a ") { album = album.slice(2); }
											else if (album.substr(0,3) == "an ") { album = album.slice(3); }
											else if (album.substr(0,4) == "the ") { album = album.slice(4); }*/
											
											//put at end of sort list
											combined = "\"Various Artits\",\"" + album + "\"";
											break outerLoop;
										}
									}
								}
							}
						}
						names.push(combined);
					}
				}
				var message = '';
				for (var x =0; x< names.length; x++) {
					message = message + names[x] + "<br>";
				}
				//alert(message);
				document.body.innerHTML = message;
				/*
				var newDoc = document.implementation.createDocument('', '', null),
					html = document.createElement('html'),
					txt = document.createTextNode(combined);
					html.innerHTML = "<body><p>LOL";
				newDoc.appendChild(html);
				
				//document.location.href = newDoc;
				//document.innerHTML = names;
				window.open(newDoc);*/
				
			}

			//imageLink.setAttribute('torrent-url', lx[i].href);
			//imageLink.setAttribute('torrent-name', lx[i].innerHTML);
			//		lx = document.getElementById('torrent_table').getElementsByTagName('a');



			// uncheck the boxes in the range (note: the above/below loops should be separate for speed issues
			for (var c =0; c< lx.length; c++) {
				if (c >= upperRangeValue && c <= lowerRangeValue) {
					box[c].checked = false;
					box[c].disabled = false;
				}	
			}
			box[upperRangeValue].setAttribute('realChecked', "0");
			box[lowerRangeValue].setAttribute('realChecked', "0");
		}
	}, false);
}


// get the collage ID from stored file
function getCollageID() {
	collageID = GM_getValue("key", "0");
	collName = GM_getValue("keyName", "None");
}

// write the collage ID to the stored file
function setCollageID() {
	GM_setValue("keyName", this.getAttribute('collage-name'));
	GM_setValue("key", this.getAttribute('collage-url'));
	collName = this.getAttribute('collage-name');
	collageID = this.getAttribute('collage-url');
	window.location.reload();
}

function image_click(e) {
	var authKey = findAuthKey();

	//error checking on collageID in case user updates collage and doesn't refresh torrents.php page
	if (GM_getValue('key') != collageID) {
		alert('Active collage has changed. Refresh the page and try again!');
		return;
	}

    var img = this;
	img.src = ICON_LOADING;

	GM_xmlhttpRequest({
		method: "POST",
		url: site_base_url + "/collages.php",
		data: "action=add_torrent&auth=" + authKey + "&collageid=" + collageID + "&url=" + this.getAttribute('torrent-url'),
		headers: { "Content-Type" : "application/x-www-form-urlencoded" },
		onload: function(response) { 
			// add the checkmark image
			if (response.responseText.match(/Invalid authorization key/)) {
                img.src = ICON_ERR;
				alert('Invalid authorization key. Refresh the page and try again!');
			} else {
				img.src = ICON_OK;
			}
		},
		onerror: function(f) {
			img.src = ICON_ERR;
		}
	});

}

//find authkey
function findAuthKey() {
	/*var authKeyFind = document.getElementsByTagName('head');
	for (var x =0; x< authKeyFind.length; x++) {
		if (authKeyFind[x].innerHTML.match(/authkey/)) { 	
			var tempFindAuth = authKeyFind[x].innerHTML;
			tempFindAuth = tempFindAuth.split('authkey=')[1].split('"')[0];
			return tempFindAuth;
		}
	}*/
    return unsafeWindow.authkey;
}