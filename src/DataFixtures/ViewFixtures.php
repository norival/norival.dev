<?php

namespace App\DataFixtures;

/* use App\Entity\User; */
use App\Entity\View;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ViewFixtures extends Fixture implements DependentFixtureInterface
{
    public const VIEW_CV_REFERENCE = 'view-cv';

    public function load(ObjectManager $manager)
    {
        $loremMessage =
            'Overview: Amet tenetur sequi tempore minus nam velit doloribus culpa excepturi! Consequuntur quas sint aperiam libero iure. Consectetur ut placeat amet voluptate in vero ut. Assumenda impedit aut aspernatur commodi fugiat?Views are a group of contents.';

        $view = new View();
        $user = $this->getReference(UserFixtures::USER_TEST);

        $view->setUser($user);
        $view->setName('cv');
        $view->setTitle('Xavier Laviron');
        $view->setDescription($loremMessage);
        $view->setCreatedAt(date_create());
        $manager->persist($view);

        for ($i = 1; $i < 200; $i++) {
            $viewDemo = new View();
            $user = $this->getReference(UserFixtures::USER_TEST);

            $date = date_create();
            $interval = rand(1, 11111);
            $interval = "P{$interval}D";
            $dateInterval = new \DateInterval($interval);
            $dateInterval->invert = 1;
            $date->add($dateInterval);

            $viewDemo->setUser($user);
            /* $viewDemo->setName("demoView_$i"); */
            $viewDemo->setName(uniqid('view_'));
            $viewDemo->setTitle("Demo view $i");
            $viewDemo->setDescription($loremMessage);
            $viewDemo->setCreatedAt($date);
            $manager->persist($viewDemo);
        }

        $manager->flush();

        $this->addReference(self::VIEW_CV_REFERENCE, $view);
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
