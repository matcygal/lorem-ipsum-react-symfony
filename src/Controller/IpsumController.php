<?php
namespace App\Controller;

use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Request\ParamFetcher as ParamFetcher;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Symfony\Component\HttpFoundation\JsonResponse;


use App\Ipsum;
/**
 * API controller.
 *
 * @Route("/api")
 */
class IpsumController extends Controller
{
    /**
     * Get ipsum response
     *
     * @FOSRest\Get("/ipsum")
     *
     * @return array
     */
    public function getIpsumAction(Request $request)
    {
        $model = new Ipsum;

        $number = intval($request->query->get('number'));
        if (!(0 < $number && $number <= 500)) {
            $number = 10;
        }

        if (!$number) {
            $number = 10;
        }

        $nav = $request->query->get('nav');

        if ($nav === "0") {
            $response = $model->words($number);
        } elseif ($nav === "1") {
            $response = $model->sentences($number);
        } elseif ($nav === "2") {
            $response = $model->paragraphs($number, 'p');
        } else {
            $response = $model->paragraphs($number, 'p');
        }

        return new JsonResponse($response);
    }
}